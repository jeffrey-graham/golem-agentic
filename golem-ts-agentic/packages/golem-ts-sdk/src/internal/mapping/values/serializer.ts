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
  AnalysedType,
  NameOptionTypePair,
  NameTypePair,
  TypedArray,
} from '../types/AnalysedType';
import * as Either from '../../../newTypes/either';
import * as Option from '../../../newTypes/option';
import {
  customSerializationError,
  enumMismatchInSerialize,
  missingObjectKey,
  typeMismatchInSerialize,
  unhandledTypeError,
  unionTypeMatchError,
} from './errors';
import { TaggedTypeMetadata } from '../types/taggedUnion';
import { Value } from './Value';
import { BinaryReference, TextReference } from 'golem:agent/common';
import * as util from 'node:util';


/**
 * Converts a TypeScript value to a `Value` (one level before it becomes WitValue)
 * based on the provided AnalysedType.
 *
 * Serialization of a TypeScript mainly required at RPC boundary
 * as well as when a result of a method needs to be sent through to golem executor.
 *
 * @param tsValue The TypeScript value that exists as `any` type, which represents anything other than unstructured-text or unstructured-binary.
 * @param analysedType The expected AnalysedType of the typescript value. There is no `AnalysedType` as such for unstructured-text or unstructured-binary.
 */
export function serializeDefaultTsValue(
  tsValue: any,
  analysedType: AnalysedType,
): Either.Either<Value, string> {
  switch (analysedType.kind) {
    case 'flags':
      return Either.left(
        unhandledTypeError(tsValue, Option.some('flags'), Option.none()),
      );
    case 'chr':
      return Either.left(
        unhandledTypeError(tsValue, Option.some('char'), Option.none()),
      );
    case 'f32':
      if (typeof tsValue === 'number') {
        return Either.right({
          kind: 'f32',
          value: tsValue,
        });
      } else {
        return Either.left(typeMismatchInSerialize(tsValue, 'number'));
      }
    case 's64':
      if (typeof tsValue === 'bigint') {
        return Either.right({
          kind: 's64',
          value: tsValue,
        });
      } else {
        return Either.left(typeMismatchInSerialize(tsValue, 'number'));
      }
    case 'u32':
      if (typeof tsValue === 'number') {

// `void` and `undefined` both map to WIT/Golem unit (empty tuple)
// so that void return types and generic unit payloads are serialized uniformly.
export function isUnitOrVoidValue(value: unknown): value is undefined | void {
  return value === undefined;
}
