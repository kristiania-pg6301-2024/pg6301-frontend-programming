import React from "react";

import "./progressIndicator.css";

export function ProgressIndicator({ title }: { title?: string }) {
  return <div className="progressIndicator" title={title}></div>;
}
