import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export default function Home() {
  const [codeInput, setCodeInput] = useState(`
  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/documentation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput }),
    });
    const data = await response.json();
    console.log({ "data.result": data.result });
    setResult(data.result);
    setCodeInput("");
    setLoading(false);
  }`);
  const [result, setResult] = useState(``);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const response = await fetch("/api/documentation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: codeInput }),
    });
    const data = await response.json();
    console.log({ "data.result": data.result });
    setResult(data.result);
    setCodeInput("");
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <form style={{ width: "80%" }} onSubmit={onSubmit}>
          <div style={{ display: "flex", width: "100%" }}>
            <Editor
              height="60vh"
              width="50%"
              onChange={(v) => setCodeInput(v)}
              defaultLanguage="javascript"
              defaultValue="// some comment"
              theme="dark"
              value={codeInput}
            />
            <p
              style={{ width: "50%", marginLeft: 10 }}
              className={styles.result}
            >
              {result?.split("\n").map((el) => (
                <>
                  {el} <br />{" "}
                </>
              ))}
            </p>
          </div>
          {loading && "...loading"}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <input
              style={{ width: "60%" }}
              type="submit"
              value="Generate documentation"
              onClick={onSubmit}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
