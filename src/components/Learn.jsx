import React from "react";
import { Link } from "react-router-dom";

export default function Learn() {
  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <h3 className="center-align">Learn About Regex</h3>
      <p>
        Regular expressions (regex) are patterns used to match character combinations in strings.  
        They are very powerful for searching, replacing, and validating text.
      </p>

      <ul className="collection">
        <li className="collection-item">
          <code>^</code> - Matches the start of a string
        </li>
        <li className="collection-item">
          <code>$</code> - Matches the end of a string
        </li>
        <li className="collection-item">
          <code>.</code> - Matches any single character except newline
        </li>
        <li className="collection-item">
          <code>*</code> - Matches 0 or more repetitions
        </li>
        <li className="collection-item">
          <code>+</code> - Matches 1 or more repetitions
        </li>
        <li className="collection-item">
          <code>?</code> - Matches 0 or 1 repetition
        </li>
        <li className="collection-item">
          <code>[abc]</code> - Matches any one of the characters a, b, or c
        </li>
        <li className="collection-item">
          <code>(a|b)</code> - Matches either a or b
        </li>
        <li className="collection-item">
          <code>\d</code> - Matches any digit
        </li>
        <li className="collection-item">
          <code>\w</code> - Matches any word character (alphanumeric + underscore)
        </li>
        <li className="collection-item">
          <code>\s</code> - Matches any whitespace character
        </li>
      </ul>

      <div className="center-align" style={{ marginTop: "2rem" }}>
        <Link to="/" className="btn waves-effect waves-light">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
