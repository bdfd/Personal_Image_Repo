'use strict';

var copyTextToClipboard = function copyTextToClipboard(input) {
    var element = document.createElement('textarea');
    var previouslyFocusedElement = document.activeElement;
    element.value = input; // Prevent keyboard from showing on mobile

    element.setAttribute('readonly', '');
    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS

    var selection = document.getSelection();
    var originalRange = false;

    if (selection.rangeCount > 0) {
        originalRange = selection.getRangeAt(0);
    }

    document.body.appendChild(element);
    element.select(); // Explicit selection workaround for iOS

    element.selectionStart = 0;
    element.selectionEnd = input.length;
    var isSuccess = false;

    try {
        isSuccess = document.execCommand('copy');
    } catch (_) {}

    element.parentNode.removeChild(element);

    if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
    } // Get the focus back on the previously focused element, if any


    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }

    return isSuccess;
};