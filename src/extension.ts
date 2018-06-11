'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "tablegenerator" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.generateTable', () => {

        function editText(text : string ) {
			let editor = vscode.window.activeTextEditor;
			let insertPosition : vscode.Position = editor.selection.active;

			//edit text
			editor.edit(edit => {
				edit.insert(insertPosition, text);
			});		
        }
        
        function generateString(rows, columns) : string {
            let base_header =       "       |";
            let base_seperator =    "  ---  |";
            
            var string_header = "|";
            var string_seperator = "|";
            var string_base = "";

            
            for (var _i = 0; _i < columns; _i++) {
                string_header = string_header + base_header;
                string_seperator = string_seperator + base_seperator;
            }

            for(var _j = 0; _j < rows; _j++){
                string_base = string_base + string_header + '\n';
            }
            console.log(string_header);
            console.log(string_seperator);
            console.log(string_base);

            return string_header + '\n' + string_seperator + '\n' + string_base;
        }

        
        // The code you place here will be executed every time your command is executed
        var user_input;
        var columns = 3;     //default init to 3
        var rows = 3;        //default init to 3


        let options: vscode.InputBoxOptions = {
            prompt: "Please insert size of table: \"Rows,Columns\" ",
            placeHolder: "3,3"
        }
        
        vscode.window.showInputBox(options).then(value => {
            console.log(value);
            user_input = value.split(',');
            rows = user_input[0];
            columns = user_input[1];
            console.log(user_input);

            
            editText(generateString(rows, columns));
            vscode.window.showInformationMessage('New markdown table was created...');
        });
        
        // Display a message box to the user
        
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}


