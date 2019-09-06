import {h} from '@stencil/core';
export default function (width = 12, height = 12, fill="#fff") {
  return (
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 1024 1024">
      <path fill={fill} d="M768 224 448 544l-192-192-128 128 320 320 448-448L768 224z"/>
    </svg>
  );
}