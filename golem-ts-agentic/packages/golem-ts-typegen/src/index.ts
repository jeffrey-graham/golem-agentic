// Copyright 2024-2025 Golem Cloud
//
// Licensed under the Golem Source License v1.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://license.golem.cloud/LICENSE
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


import {
  MethodDeclaration,
  Node as TsMorphNode,
  Scope,
  SourceFile,
  SyntaxKind,
  ts,
  Type as TsMorphType,
  ClassDeclaration,
  PropertyDeclaration,
  Symbol as TsMorphSymbol,
} from "ts-morph";
import {
  buildJSONFromType,
  LiteTypeJSON,
  Node,
  Symbol,
  Type,
  TypeMetadata,
} from "@golemcloud/golem-ts-types-core";


import * as fs from "node:fs";
import path from "path";
import { option } from "fast-check";


export function unwrapOptionalType(
  type: TsMorphType,
  isQuestionToken = false,
): { innerType: TsMorphType; isOptional: boolean } {
  if (type.isUnion()) {
    const unionTypes = type.getUnionTypes();
    const nonUndefined = unionTypes.filter((t) => !t.isUndefined());
    if (nonUndefined.length < unionTypes.length && nonUndefined.length === 1) {
      return { innerType: nonUndefined[0], isOptional: true };
    }
  }
  return { innerType: type, isOptional: isQuestionToken };
}

export function getTypeFromTsMorph(
  tsMorphType: TsMorphType,
  isOptional: boolean,
): Type.Type {
  const unwrapped = unwrapOptionalType(tsMorphType, isOptional);
  tsMorphType = unwrapped.innerType;
  isOptional = unwrapped.isOptional;
  try {
    return getTypeFromTsMorphInternal(tsMorphType, isOptional, new Set());
  } catch (e) {
    if (e instanceof Error) {
      let error = e.message;
      if (e.stack) {
        error = error + "\n\n" + e.stack;
      }


      return {
        kind: "unresolved-type",
        name: undefined,
        optional: isOptional,
        text: tsMorphType.getText(),
        error: error,
      };
    } else {
      throw e;
    }
  }
}


function getTypeFromTsMorphInternal(
  tsMorphType: TsMorphType,
  isOptional: boolean,
  visitedTypes: Set<TsMorphType>,
): Type.Type {
  const type = unwrapAlias(tsMorphType);
  const rawName = getRawTypeName(type);
  const aliasName = getAliasTypeName(type);


  if (visitedTypes.has(tsMorphType)) {
    return {
      kind: "others",
      name: rawName ?? aliasName ?? type.getText(),
