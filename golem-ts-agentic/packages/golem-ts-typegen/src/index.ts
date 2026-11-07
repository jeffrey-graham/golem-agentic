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


export function getTypeFromTsMorph(
  tsMorphType: TsMorphType,
  isOptional: boolean,
): Type.Type {
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

export function resolveGenericTypeArguments(
  typeParamNames: readonly string[],
  typeArguments: readonly string[],
): ReadonlyMap<string, string> {
  const bindings = new Map<string, string>();
  typeParamNames.forEach((param, idx) => {
    if (idx < typeArguments.length) {
      bindings.set(param, typeArguments[idx]);
    }
  });
  return bindings;
}
