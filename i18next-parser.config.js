const config = {
    input: ['src/**/*.{js,jsx,ts,tsx}'], // Files to scan for translation keys
    output: 'src/locales/$LOCALE/$NAMESPACE.json', // Output path for JSON files
    locales: ['en', 'ar'], // Supported languages
    defaultNamespace: 'translation', // Default namespace
    keySeparator: false, // Don't separate keys by dots (if you're using nested keys)
    namespaceSeparator: false, // Don't separate namespaces with colons
};

export default config;
// module.exports = config;
  
