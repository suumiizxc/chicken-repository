import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <span>
          Copyright © 2021{" "}
          <span className="font-weight-semibold">Medlegten</span> All rights
          reserved.
        </span>
        <div>
          <a className="text-gray" href="/#">
            Term &amp; Conditions
          </a>
          <span className="mx-2 text-muted"> | </span>
          <a className="text-gray" href="/#">
            Privacy &amp; Policy
          </a>
        </div>
      </footer>
    </>
  );
}
