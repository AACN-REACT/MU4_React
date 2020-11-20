import React from "react";

export function IdleList() {
  return <div className="idle-list-state">Cannot fetch lists</div>;
}

export function LoadingList() {
  return [
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
    <div className="loading-list-state">Loading</div>,
  ];
}
