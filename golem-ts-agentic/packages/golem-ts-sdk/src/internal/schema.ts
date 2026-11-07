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


import { Type } from '@golemcloud/golem-ts-types-core';
import * as Either from '../newTypes/either';
import * as Option from '../newTypes/option';
import {
  AgentMethod,
  BinaryDescriptor,
  DataSchema,
  ElementSchema,
  TextDescriptor,
} from 'golem:agent/common';
import * as WitType from './mapping/types/WitType';
import { AgentMethodRegistry } from './registry/agentMethodRegistry';
import {
  ClassMetadata,
  ConstructorArg,
  MethodParams,
} from '@golemcloud/golem-ts-types-core';
import { TypeMappingScope } from './mapping/types/scope';
import { AgentConstructorParamRegistry } from './registry/agentConstructorParamRegistry';
import { AgentMethodParamRegistry } from './registry/agentMethodParamRegistry';
import {
  AnalysedType,
  EmptyType,
  result,
  tuple,
} from './mapping/types/AnalysedType';
import { TypeInfoInternal } from './registry/typeInfoInternal';
import {
  convertAgentMethodNameToKebab,
  convertVariantTypeNameToKebab,
} from './mapping/types/stringFormat';
import { ParameterDetail } from './mapping/values/dataValue';
import { getTaggedUnion, TaggedUnion } from './mapping/types/taggedUnion';


const MULTIMODAL_TYPE_NAMES = [
  'Multimodal',
  'MultimodalAdvanced',
  'MultimodalCustom',
];


export function getConstructorDataSchema(
  agentClassName: string,
  classType: ClassMetadata,
): Either.Either<DataSchema, string> {
  const constructorParamInfos: readonly ConstructorArg[] =
    classType.constructorArgs;


  if (
    constructorParamInfos.length === 1 &&
    isNamedMultimodal(constructorParamInfos[0].type)
  ) {
    const paramType = constructorParamInfos[0].type;


    if (isNamedMultimodal(paramType) && paramType.kind === 'array') {
      const elementType = paramType.element;


      const multiModalDetails = getMultimodalDetails(elementType);


      if (Either.isLeft(multiModalDetails)) {
        return Either.left(
          `Failed to get multimodal details: ${multiModalDetails.val}`,
        );
      }



export function bindGenericSchemaTypeParameters<T>(
  typeParams: readonly string[],
  typeArgs: readonly T[],
): ReadonlyMap<string, T> {
  const map = new Map<string, T>();
  typeParams.forEach((name, idx) => {
    if (idx < typeArgs.length) {
      map.set(name, typeArgs[idx]);
    }
  });
  return map;
}
