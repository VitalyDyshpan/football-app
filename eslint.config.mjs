// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
export default withNuxt(
	// Your custom configs here
	{
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: "module"
		},
		rules: {
			semi: ["error", "always"],
			"object-curly-spacing": ["error", "always"],
			quotes: ["error", "double"],
			"no-trailing-spaces": "error",
			"no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
			"quote-props": ["warn", "as-needed"],
			"vue/html-indent": ["error", "tab", {
				attribute: 1,
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}],
			"vue/max-attributes-per-line": ["error", {
				singleline: {
					max: 1
				},
				multiline: {
					max: 1
				}
			}]
		},
		ignores: [

		]
	}
);
