import template from "./template.html?raw";

const renderTemplate = (html, data) => {
  let output = html;

  Object.keys(data).forEach((key) => {
    let value = data[key];

    if (Array.isArray(value)) {
      value = value.join(", ");
    }

    output = output.replaceAll(`{{${key}}}`, value || "");
  });

  return output;
};

export const renderECR = (formData) => {
  return renderTemplate(template, formData);
};