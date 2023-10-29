import { ClientEventReadyMessage } from '../messages/client/ClientEventReadyMessage';
import { ClientRequestEvironmentMessage } from '../messages/client/ClientRequestEvironmentMessage';
import { ClientRequestNavigateMessage } from '../messages/client/ClientRequestNavigateMessage';
import { ClientRequestNotifyMessage } from '../messages/client/ClientRequestNotifyMessage';
import { HostEventInitMessage } from '../messages/host/HostEventInitMessage';
import { HostEventStateMessage } from '../messages/host/HostEventStateMessage';
import { HostRequestShellMessage } from '../messages/host/HostRequestShellMessage';
import { MessageType } from '../messages/MessageType';

export const isClientReadyMessage = (messageInfo: any): messageInfo is ClientEventReadyMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_EVENT_READY) {
    return false;
  }

  return true;
};

export const isClientDecorateMessage = (messageInfo: any): messageInfo is ClientRequestEvironmentMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_REQUEST_DECORATE) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'value') || typeof messageInfo.value !== 'string') {
    return false;
  }

  return true;
};

export const isClientEnvironmentMessage = (messageInfo: any): messageInfo is ClientRequestEvironmentMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_REQUEST_ENVIRONMENT) {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'environment') ||
    typeof messageInfo.environment !== 'object'
  ) {
    return false;
  }

  return true;
};

export const isClientNavigationMessage = (messageInfo: any): messageInfo is ClientRequestNavigateMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_REQUEST_NAVIGATE) {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'destination') ||
    typeof messageInfo.destination !== 'string'
  ) {
    return false;
  }

  return true;
};

export const isClientNotificationMessage = (messageInfo: any): messageInfo is ClientRequestNotifyMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_REQUEST_NOTIFY) {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'notificationText') ||
    typeof messageInfo.notificationText !== 'string'
  ) {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'notificationType') ||
    typeof messageInfo.notificationType !== 'string'
  ) {
    return false;
  }

  return true;
};

export const isClientSnapshotMessage = (messageInfo: any): messageInfo is ClientRequestNotifyMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.CLIENT_REQUEST_SNAPSHOT) {
    return false;
  }

  return true;
};

export const isHostDiagnosticsMessage = (messageInfo: any): messageInfo is ClientRequestNotifyMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.HOST_EVENT_DIAG) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'loadTime') || typeof messageInfo.loadTime !== 'number') {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'readyTime') || typeof messageInfo.readyTime !== 'number') {
    return false;
  }

  return true;
};

export const isHostInitMessage = (messageInfo: any): messageInfo is HostEventInitMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.HOST_EVENT_INIT) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'manifest') || typeof messageInfo.manifest !== 'object') {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'configuration') ||
    typeof messageInfo.configuration !== 'object'
  ) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'context') || typeof messageInfo.context !== 'object') {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'locationSearchParams') ||
    typeof messageInfo.locationSearchParams !== 'object'
  ) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'sessionId') || typeof messageInfo.sessionId !== 'string') {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'token') || typeof messageInfo.sessionId !== 'object') {
    return false;
  }

  if (
    !Object.prototype.hasOwnProperty.call(messageInfo, 'environment') ||
    typeof messageInfo.environment !== 'number'
  ) {
    return false;
  }

  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'version') || typeof messageInfo.version !== 'string') {
    return false;
  }
  return true;
};

export const isHostStateMessage = (messageInfo: any): messageInfo is HostEventStateMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.HOST_EVENT_STATE) {
    return false;
  }

  return true;
};

export const isHostShellMessage = (messageInfo: any): messageInfo is HostRequestShellMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.HOST_REQUEST_SHELL) {
    return false;
  }

  return true;
};

export const isHostTooltipMessage = (messageInfo: any): messageInfo is HostRequestShellMessage => {
  if (!Object.prototype.hasOwnProperty.call(messageInfo, 'type') || typeof messageInfo.type !== 'string') {
    return false;
  }

  if (messageInfo.type !== MessageType.HOST_REQUEST_TOOLTIPS) {
    return false;
  }

  return true;
};
