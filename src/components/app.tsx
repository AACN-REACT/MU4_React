import React from "react";
import { Uploader } from "./uploader.tsx";

import { Title } from "./title/title";
import googleapi from "../utils/googleapi";
import { Table } from "./table";
import { ListItem } from "./";

export default function App() {
  return (
    <div>
      <Title title="AACN VideoUploader" />
      <Uploader />
      <div className="center-content">
        <Table heading="Pending" />
        <Table heading="Completed" />
      </div>
    </div>
  );
}
