let executeCopy = () => {
    try {
        return document.queryCommandSupported('copy') &&
               document.queryCommandEnabled('copy') &&
               document.execCommand('copy');
    } catch (e) {
        console.error(e);
        return false;
    }
};

export default text => {
    var textArea = document.createElement("textarea");

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    let success = executeCopy();

    document.body.removeChild(textArea);
    return success;
};
