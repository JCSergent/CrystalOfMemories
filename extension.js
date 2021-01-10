// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { Console } = require('console');
const vscode = require('vscode');
const { resolveCliPathFromVSCodeExecutablePath } = require('vscode-test');
const editor = vscode.window.activeTextEditor;
var savedPosition = new vscode.Position(0,0);

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Crystal Of Memories Activated');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let saveLocation = vscode.commands.registerCommand('coMemories.saveCrystal', function () {
	
		vscode.window.showInformationMessage('Saving the Crystals Location');

		if(editor.selection.isEmpty) {
			savedPosition = editor.selection.active;
		}

		console.log("Saving Cursor Position at:");
		console.log("Line: "+savedPosition.line);
		console.log("Character: "+savedPosition.character);
		console.log(savedPosition);

	});

	let loadLocation = vscode.commands.registerCommand('coMemories.useCrystal', function () {

		vscode.window.showInformationMessage('Going to the Crystals Location');

		var newPosition = savedPosition.with(savedPosition.line, savedPosition.character);
		var newSelection = new vscode.Selection(newPosition, newPosition);
		editor.selection = newSelection;

		console.log("Using Crystal of Memories");
		console.log(newPosition);

	});





	context.subscriptions.push(saveLocation, loadLocation);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}
