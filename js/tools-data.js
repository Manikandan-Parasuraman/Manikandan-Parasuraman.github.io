const TOOLS = [
    // Data Format
    { name: "JSON Formatter", desc: "Format, validate and beautify JSON data.", category: "Data Format", path: "json-formatter" },
    { name: "JSON \u2192 YAML", desc: "Convert JSON to YAML (Simulated).", category: "Data Format", path: "json-to-yaml" },
    { name: "YAML \u2192 JSON", desc: "Convert YAML to JSON (Simulated).", category: "Data Format", path: "yaml-to-json" },
    { name: "CSV \u2192 JSON", desc: "Convert CSV to JSON.", category: "Data Format", path: "csv-to-json" },
    { name: "JSON \u2192 CSV", desc: "Convert JSON to CSV.", category: "Data Format", path: "json-to-csv" },
    { name: "XML Formatter", desc: "Format XML strings.", category: "Data Format", path: "xml-formatter" },

    // Encoding & Decoding
    { name: "Base64 Encoder / Decoder", desc: "Base64 processing.", category: "Encoding & Decoding", path: "base64-codec" },
    { name: "URL Encoder / Decoder", desc: "URL processing.", category: "Encoding & Decoding", path: "url-codec" },
    { name: "HTML Entities Encoder", desc: "Encode HTML special chars.", category: "Encoding & Decoding", path: "html-encoder" },
    { name: "JWT Decoder", desc: "Decode JWT payloads.", category: "Encoding & Decoding", path: "jwt-decoder" },
    { name: "Unicode Converter", desc: "Text to Unicode escape.", category: "Encoding & Decoding", path: "unicode-converter" },

    // Time & Date
    { name: "Unix Timestamp Converter", desc: "Epoch time conversion.", category: "Time & Date", path: "unix-timestamp" },
    { name: "Age Calculator", desc: "Calculate age from birthdate.", category: "Time & Date", path: "age-calculator" },

    // String & Text
    { name: "Case Converter", desc: "Change text casing.", category: "String & Text", path: "case-converter" },
    { name: "Word Counter", desc: "Count words and chars.", category: "String & Text", path: "word-counter" },
    { name: "Random String Generator", desc: "Generate random text.", category: "String & Text", path: "random-string" },
    { name: "Slug Generator", desc: "Convert to URL slug.", category: "String & Text", path: "slug-generator" },

    // Developer Coding
    { name: "UUID Generator", desc: "v4 UUID Generator.", category: "Developer Coding", path: "uuid-generator" },
    { name: "Hash Generator", desc: "SHA-256 Hash.", category: "Developer Coding", path: "hash-generator" },
    { name: "Color Code Converter", desc: "HEX to RGB.", category: "Developer Coding", path: "color-converter" },

    // Productivity
    { name: "Markdown Preview", desc: "Basic MD to HTML.", category: "Productivity", path: "markdown-previewer" },
    { name: "Random Color", desc: "Get a random HEX.", category: "Fun & Useful", path: "random-color" },

    // General Utility (Generated)
    { name: "Json Minify", desc: "Developer utility for json minify", category: "General Utility", path: "json-minify" },
    { name: "Xml To Json", desc: "Developer utility for xml to json", category: "General Utility", path: "xml-to-json" },
    { name: "Yaml Formatter", desc: "Developer utility for yaml formatter", category: "General Utility", path: "yaml-formatter" },
    { name: "Sql Formatter", desc: "Developer utility for sql formatter", category: "General Utility", path: "sql-formatter" },
    { name: "Binary Codec", desc: "Developer utility for binary codec", category: "General Utility", path: "binary-codec" },
    { name: "Hex Codec", desc: "Developer utility for hex codec", category: "General Utility", path: "hex-codec" },
    { name: "Ascii Codec", desc: "Developer utility for ascii codec", category: "General Utility", path: "ascii-codec" },
    { name: "Morse Codec", desc: "Developer utility for morse codec", category: "General Utility", path: "morse-codec" },
    { name: "Timezone Converter", desc: "Developer utility for timezone converter", category: "General Utility", path: "timezone-converter" },
    { name: "Cron Generator", desc: "Developer utility for cron generator", category: "General Utility", path: "cron-generator" },
    { name: "Date Diff", desc: "Developer utility for date diff", category: "General Utility", path: "date-diff" },
    { name: "Text Diff", desc: "Developer utility for text diff", category: "General Utility", path: "text-diff" },
    { name: "Whitespace Remover", desc: "Developer utility for whitespace remover", category: "General Utility", path: "whitespace-remover" },
    { name: "Line Counter", desc: "Developer utility for line counter", category: "General Utility", path: "line-counter" },
    { name: "Hash Compare", desc: "Developer utility for hash compare", category: "General Utility", path: "hash-compare" },
    { name: "Jwt Inspector", desc: "Developer utility for jwt inspector", category: "General Utility", path: "jwt-inspector" },
    { name: "Http Headers", desc: "Developer utility for http headers", category: "General Utility", path: "http-headers" },
    { name: "Query Parser", desc: "Developer utility for query parser", category: "General Utility", path: "query-parser" },
    { name: "Html Escape", desc: "Developer utility for html escape", category: "General Utility", path: "html-escape" },
    { name: "Json Schema Validator", desc: "Developer utility for json schema validator", category: "General Utility", path: "json-schema-validator" },
    { name: "Keyboard Shortcuts", desc: "Developer utility for keyboard shortcuts", category: "General Utility", path: "keyboard-shortcuts" },
    { name: "Typing Test", desc: "Developer utility for typing test", category: "General Utility", path: "typing-test" },
    { name: "Flexbox Playground", desc: "Developer utility for flexbox playground", category: "General Utility", path: "flexbox-playground" },
    { name: "Grid Generator", desc: "Developer utility for grid generator", category: "General Utility", path: "grid-generator" },
    { name: "Favicon Generator", desc: "Developer utility for favicon generator", category: "General Utility", path: "favicon-generator" },
    { name: "Password Strength", desc: "Developer utility for password strength", category: "General Utility", path: "password-strength" },
    { name: "Ip Validator", desc: "Developer utility for ip validator", category: "General Utility", path: "ip-validator" },
    { name: "Url Parser", desc: "Developer utility for url parser", category: "General Utility", path: "url-parser" },
    { name: "Table Generator", desc: "Developer utility for table generator", category: "General Utility", path: "table-generator" },
    { name: "Emoji Picker", desc: "Developer utility for emoji picker", category: "General Utility", path: "emoji-picker" }
];
