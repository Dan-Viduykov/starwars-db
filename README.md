1. Open the root folder of your project through the command line
   It may looks like the following below:

   [user@fedora my-app]$

2. Run the next Terminal Commands to install require packets from npm

npm i --save-dev eslint
npm i --save-dev prettier
npm i --save-dev babel-eslint
npm i --save-dev eslint-config-airbnb
npm i --save-dev eslint-config-prettier
npm i --save-dev eslint-plugin-prettier
npm i --save-dev eslint-plugin-html
npm i --save-dev eslint-plugin-import
npm i --save-dev eslint-plugin-jsx-a11y (a11y not ally, those are numbers)
npm i --save-dev eslint-plugin-react
npm i --save-dev eslint-plugin-react-hooks

    Don't forget about the command: npm audit fix to install any compatible updates to vulnerable dependencies!

3. Create the files .prettierrc and .eslintrc (those are config files for packets you have installed before)
   The content of the .prettierrc: (you may change it)

{
"singleQuote": true,
"trailingComma": "es5",
"endOfLine": "lf",
"printWidth": 120
}

The content of the .eslintrc file (you may change it as well)

{
"extends": [
"airbnb",
"airbnb/hooks",
"eslint-config-prettier",
"prettier"
],
"plugins": [
"react",
"react-hooks",
"import",
"jsx-a11y"
],
"parser": "babel-eslint",
"env": {
"browser": true,
"jest": true
},
"rules": {
"curly": ["error"],
"max-depth": ["warn", 4],
"id-length": ["warn", {
"exceptions": ["i", "j"],
"min": 2
}],
"no-lonely-if": ["error"],
"no-plusplus": ["off"],
"no-restricted-syntax": "off",
"class-methods-use-this": "off",
"jsx-a11y/href-no-hash": ["off"],
"jsx-a11y/anchor-is-valid": ["off"],
"jsx-a11y/label-has-associated-control": [
"error",
{
"assert": "either"
}
],
"react/state-in-constructor": ["off"],
"react/jsx-props-no-spreading": ["off"],
"react/static-property-placement": "off",
"react/jsx-filename-extension": [1, {
"extensions": [".js", ".jsx"]
}],
"react/destructuring-assignment": "off",
"no-param-reassign": "off",
"no-return-assign": "off"
},
"settings": {
"react": {
"pragma": "React",
"version": "detect"
}
}
} 4. Create a file .eslintignore
The content of it: (you may change it)
node_modules
/.vscode
/.git 5. Time to add some scripts to be able to use it from Terminal
Open the file package.json from your root folder project
Find the name "scripts" inside that file
Add your own name and options to your scripts
It might be looked like that (you may change it)

"scripts": {
"start": react - scripts start ",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"lint": "eslint \"src/**/\*.{js,jsx}\"",
"lint:fix": "eslint \"src/**/\*.{js,jsx}\" --fix --color",
"format": "prettier --config .prettierrc ./src --write",
}, 6. You're able to use the scripts now
For example, like this:
npm run lint - this command will scan all your files (from the path you specified) for errors
npm run lint:fix - this command will fix all possible errors
npm run format - this one will format all your files containing erros 7. Probably when you have used the command "npm run lint" you see some errors such as "Cannot use import statement outside a module"
Well, let's fix it by replacing babel-eslint with @babel/eslint-parser
Run the commands:
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save-dev @babel/preset-react
Create a file "babel.config.json" (you may change it as well) inside your root folder project "again"
The content of it: (you may change it)

{
"presets": [
[
"@babel/preset-env",
{
"browserslistEnv": "> 0.25%, not dead"
}
]
]
}

Navigate the file ".eslintrc" and replace the parcer:

"parser": "@babel/eslint-parser",
"parserOptions": {
"sourceType": "module",
"allowImportExportEveryWhere": false,
"ecmaFeatures": {
"globalReturn": false,
"jsx": true
},
"ecmaVersion": 2020,
"babelOptions": {
"presets": [
"@babel/preset-react"
]
}
}, 8. The errors are gone! (You fixed them all! And format your code as well by using the command npm run format)
Now you might see a happy message (it's just empty) from your terminal

> my-app@0.1.0 lint /home/user/react-apps/my-app
> eslint "src/\*_/_.{js,jsx}"

    --- empty line ---

but time to configure husky & lint-staged 9. Well, let's do it!
Run the commands from your terminal:
npx husky-init --save-dev - this command will enable git hooks (you'll se a new folder "husky" in your project)
After that find the husky folder and open the file pre-commit
Add the following code within that file:
npm run lint && npm run lint:fix && npm run format
Next try to commit your code that might have some errors
And you'll see that you just can't do that because of the command above (lint)
Fix the errors so you're able to commit again. But the code is already checked and well formatted 10. What if you have a massive repository?! And you need to check out just the files that were changed?!
The lint-staged library might help you with that!
So, install it by running the following command below:
npm i --save-dev lint-staged
After that open the file package.json and add the following code at the end of your file (right after devDependencies):

"husky": {
"pre-commit": "lint-staged"
},
"lint-staged": {
"\*.js": [
"npm run lint",
"npm run lint:fix",
"npm run format"
]
}

Next go back to the file pre-commit and replace the content with the following below:
npx lint-staged
Now, you're good to go! 11. Bonus section! Deploying a react app to Vercel
Visit the site: https://vercel.com/
Sign up or login
Go back to your Terminal of the root folder of your project
Run the following command to install vercel: sudo npm i -g vercel
Run the next command to start vercel: vercel
Enter your email address: ...
Verify request: ...
Set up and deploy: "your-path"
Which scope do you want to deploy: press enter
Link to existing project: No (it's your first project, right)
What's your project's name: press enter
In which directory is your code located: press enter
Want to override the settings: No
Wait for building and deploying your project
Open a link that vercel provides at the end of operation
Congratulations! It's done!
