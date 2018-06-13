'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


        let disposable_align = vscode.commands.registerCommand('extension.generateTableWithAlignment', async () => {
            
            let options: vscode.InputBoxOptions = {
                prompt: "Please insert size of table: \"Rows,Columns\" ",
                placeHolder: "[Rows],[Columns]  \"3,3\""
            };

            var value = await vscode.window.showInputBox(options);

            let items: vscode.QuickPickItem[] = [];
            items.push({ label: 'left',  description: 'Align Left'  });
            items.push({ label: 'center', description: 'Align Center' });
            items.push({ label: 'right', description: 'Align Right' });  

            var align = await vscode.window.showQuickPick(items);
            console.log(align.label);
            var  { valid, rows, columns } = parseInput(value);
            var x = generateString("3", "3", "center");
            console.log(x);
            if(valid){
                if (insertTextIntoDocument(generateString(rows, columns, align.label))) {
                    vscode.window.showInformationMessage('New markdown table was created...');
                }
            }
           

        });
        

        let disposable = vscode.commands.registerCommand('extension.generateTable', async () => {
        
            let options: vscode.InputBoxOptions = {
                prompt: "Please insert size of table: \"Rows,Columns\" ",
                placeHolder: "[Rows],[Columns]  \"3,3\""
            };
            
            var value = await vscode.window.showInputBox(options);
            var  { valid, rows, columns } = parseInput(value);
            if(valid){
                if (insertTextIntoDocument(generateString(rows, columns, "undefined"))) {
                    vscode.window.showInformationMessage('New markdown table was created...');
                }
            }
                  
            
 
        });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable_align);
}


export function parseInput(value: string) {
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

function insertTextIntoDocument(text : string ) : boolean {
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

export function generateString(rows, columns, alignment : string) : string {

    let base_header =       "       |";
    var base_seperator;
    
    switch(alignment) { 
        case "center": { 
            base_seperator =  " :---: |"; 
            break; 
        } 
        case "right": { 
            base_seperator =  "  ---: |"; 
            break;   
        } 
        default: { 
            base_seperator =  "  ---  |";
            break; 
        } 
     } 

    var string_header = "|" + base_header.repeat(columns);
    var string_seperator = "|" + base_seperator.repeat(columns);
    var string_base  = (string_header + '\n').repeat(rows);

    return string_header + '\n' + string_seperator + '\n' + string_base + '\n';
}

// this method is called when your extension is deactivated
export function deactivate() {
}


