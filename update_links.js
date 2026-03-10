const fs = require('fs');
const path = require('path');

const baseDir = "c:/Users/user/Downloads/Ryvon-Form-Lead-main/Ryvon-Form-Lead-main";
const pages = ["Page2", "Page 3", "Page 4", "Page 5", "Page 6", "Page 7"];

for (const page of pages) {
    const filePath = path.join(baseDir, page, 'index.html');
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        // Replace Home link
        content = content.replace(/<a href="#home">Home<\/a>/g, '<a href="https://ryvon.ai/">Home</a>');

        // Replace About link
        content = content.replace(/<a href="#about">About<\/a>/g, '<a href="https://ryvon.ai/#about">About</a>');

        // Replace Product link
        content = content.replace(/<a href="#product">Product<\/a>/g, '<a href="https://ryvon.ai/#product-1">Product</a>');

        // Replace Features link
        content = content.replace(/<a href="#features">Features<\/a>/g, '<a href="https://ryvon.ai/#features">Features</a>');

        // Replace Mobile CTA Button
        content = content.replace(
            /<button class="btn-waitlist mobile-cta">\s*<span class="btn-waitlist__label">Join Waitlist<\/span>\s*<span class="btn-waitlist__glow"><\/span>\s*<\/button>/g,
            '<a href="https://ryvon.ai/#waitlist">  <button class="btn-waitlist mobile-cta">\n            <span class="btn-waitlist__label">Join Waitlist</span>\n            <span class="btn-waitlist__glow"></span>\n          </button></a>'
        );

        // Replace Desktop CTA Button
        content = content.replace(
            /<button class="btn-waitlist desktop-cta"([^>]*)>\s*<span class="btn-waitlist__label">Join Waitlist<\/span>\s*<span class="btn-waitlist__glow"><\/span>\s*<\/button>/g,
            '<a href="https://ryvon.ai/#waitlist"><button class="btn-waitlist desktop-cta"$1>\n      <span class="btn-waitlist__label">Join Waitlist</span>\n      <span class="btn-waitlist__glow"></span>\n    </button></a>'
        );

        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated " + filePath);
    } else {
        console.log("File not found: " + filePath);
    }
}
