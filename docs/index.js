function setCaretPosition(ctrl, pos) {
	// Modern browsers
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
		
	// IE8 and below
	} else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
		}
}

$('.input > ul > li > button').on('click', function(event) {
    var cursorPos = $('#inputTextarea').prop('selectionStart');
    var v = $('#inputTextarea').val();
    var textBefore = v.substring(0,  cursorPos);
    var textAfter = v.substring(cursorPos, v.length);

	let before = ""
	let after = ""

	switch (event.target.id) {
		case "boldButton":
			before = "**";
			after = "**";
			break;
		case "italicButton":
			before = "*";
			after = "*";
			break;
		case "underlineButton":
			before = "__";
			after = "__";
			break;
		case "strikethroughButton":
			before = "~~";
			after = "~~";
			break;
	}
    $('#inputTextarea').val(textBefore + before + after + textAfter);
	var input = document.getElementById("inputTextarea");
	setCaretPosition(input, cursorPos + before.length);
});

$('#inputTextarea').bind('input propertychange', function() {
	const textarea = $('#inputTextarea');
	const outputText = $("#outputText");

	$("#outputText").html(discordMarkdown.toHTML(textarea.val()).replace("> ", "<div class='citation'></div>"));
});