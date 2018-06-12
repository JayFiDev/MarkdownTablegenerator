'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function editText(text : string ) : boolean {
    let editor = vscode.window.activeTextEditor;
    
    if(editor !== undefined){
        let insertPosition : vscode.Position = editor.selection.active;
        editor.edit(edit => {
            edit.insert(insertPosition, text);
        });	
        return true;
    } else {
        vscode.window.showInformationMessage('Please open a file before generating the table');
        return false;
    }
}

function generateString(rows, columns) : string {

    let base_header =       "       |";
    let base_seperator =    "  ---  |";

    var string_header = "|" + base_header.repeat(columns);
    var string_seperator = "|" + base_seperator.repeat(columns);
    var string_base  = (string_header + '\n').repeat(rows);

    return string_header + '\n' + string_seperator + '\n' + string_base;
}

export function activate(context: vscode.ExtensionContext) {

        let disposable1 = vscode.commands.registerCommand('extension.generateTableWithAlignment', () => {
            let options: vscode.InputBoxOptions = {
                prompt: "Please insert size of table: \"Rows,Columns\" ",
                placeHolder: "3,3"
            };
            
            var return_value;
            vscode.window.showInputBox(options).then(value => {
                var  { valid, rows, columns } = ParseInput(value);
                if(valid){
                    if (editText(generateString(rows, columns))) {
                        vscode.window.showInformationMessage('New markdown table was created...');
                    }
                }
                  
            });
        });


        let disposable = vscode.commands.registerCommand('extension.generateTable', () => {
        
            let options: vscode.InputBoxOptions = {
                prompt: "Please insert size of table: \"Rows,Columns\" ",
                placeHolder: "3,3"
            };
            
            var return_value;
            vscode.window.showInputBox(options).then(value => {
                var  { valid, rows, columns } = ParseInput(value);
                if(valid){
                    if (editText(generateString(rows, columns))) {
                        vscode.window.showInformationMessage('New markdown table was created...');
                    }
                }
                  
            });
 
        });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable1);
}

 
function ParseInput(value: string) {
    var user_input;
    var columns, rows; 
    var valid : boolean;
    
    var regexp = new RegExp('[0-9]+(,[0-9]+)');
    if (regexp.test(value)) {
        valid = true;
        user_input = value.split(',');
        rows = user_input[0];
        columns = user_input[1];
        return { valid, rows, columns };
    }
    else {
        vscode.window.showInformationMessage('Wrong input format, please use \"Rows,Columns\"');
        valid = false;
        return {valid, rows, columns };
    }
   
}

// this method is called when your extension is deactivated
export function deactivate() {
}


