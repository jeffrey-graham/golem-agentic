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


import { ClassMetadata, TypeMetadata } from '@golemcloud/golem-ts-types-core';
import * as wasmRpc from 'golem:rpc/types@0.2.2';
import * as WitValue from './mapping/values/WitValue';
import * as Option from '../newTypes/option';
import * as Either from '../newTypes/either';
import {
  getAgentType,
  makeAgentId,
  RegisteredAgentType,
  Uuid,
} from 'golem:agent/host';
import { AgentClassName } from '../newTypes/agentClassName';
import {
  AgentType,
  BinaryReference,
  DataValue,
  ElementValue,
  TextReference,
} from 'golem:agent/common';
import * as Value from './mapping/values/Value';
import { RemoteMethod } from '../baseAgent';
import { AgentMethodParamRegistry } from './registry/agentMethodParamRegistry';
import { AgentConstructorParamRegistry } from './registry/agentConstructorParamRegistry';
import { AgentMethodRegistry } from './registry/agentMethodRegistry';
import { deserialize } from './mapping/values/deserializer';
import {
  serializeBinaryReferenceTsValue,
  serializeDefaultTsValue,
  serializeTextReferenceTsValue,
  serializeTsValueToBinaryReference,
  serializeTsValueToTextReference,
} from './mapping/values/serializer';
import { TypeInfoInternal } from './registry/typeInfoInternal';
import {
  createSingleElementTupleDataValue,
  deserializeDataValue,
  ParameterDetail,
  serializeToDataValue,
} from './mapping/values/dataValue';
import { randomUuid } from '../host/hostapi';
import { convertAgentMethodNameToKebab } from './mapping/types/stringFormat';
import { AgentId } from '../agentId';
import * as util from 'node:util';


export function getRemoteClient<T extends new (...args: any[]) => any>(
  agentClassName: AgentClassName,
  agentType: AgentType,
  ctor: T,
) {
  const metadataOpt = Option.fromNullable(TypeMetadata.get(ctor.name));
  if (Option.isNone(metadataOpt)) {
    throw new Error(
      `Metadata for agent class ${ctor.name} not found. Make sure this agent class extends BaseAgent and is registered using @agent decorator`,
    );
  }
  const metadata = metadataOpt.val;
  const shared = new WasmRpxProxyHandlerShared(
    metadata,
    agentClassName,
    agentType,
  );


  return (...args: any[]) => {
    const instance = Object.create(ctor.prototype);

export function createSharedRpcSerdeAdapter<TIn, TOut>(
  serialize: (input: TIn) => unknown,
  deserialize: (raw: unknown) => TOut,
): { readonly serialize: (input: TIn) => unknown; readonly deserialize: (raw: unknown) => TOut } {
  return { serialize, deserialize };
}
