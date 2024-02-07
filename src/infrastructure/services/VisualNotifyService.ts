import { Notify } from "quasar";

Notify.setDefaults({
  timeout: 3500,
  html: true,
  position: "bottom-left",
  classes: "q-py-sm q-px-lg"
});

function notify(params: { content: string; type: string }) {
  Notify.create({
    timeout: 3500,
    group: false,
    message: `${params.content}`,
    type: `${params.type}`,
    position:'top'
  });
}

function notifySuccess(params: { content: string }) {
  Notify.create({
    group: false,
    message: `The action <span class="text-uppercase text-bold">${params.content}</span> was executed correctly`,
    type: "positive"
  });
}
function notifyInfo(params: { content: string }) {
  Notify.create({
    group: false,
    message: `The action <span class="text-uppercase text-bold">${params.content}</span> was executed correctly`,
    type: "info"
  });
}

function notifyError(params?: { message: string }) {
  Notify.create({
    group: false,
    message: params
      ? params.message
      : "" +
        "We are sorry the action did not execute correctly." +
        "<br>" +
        "If the error persists please contact the administrators.",
    type: "negative"
  });
}

function notifyErrorWithMessage(params: { content: string }) {
  Notify.create({
    group: false,
    message:
      "" +
      "We are sorry the action did not execute correctly." +
      "<br>" +
      "If the error persists please contact the administrators." +
      "<br>" +
      "Error: " +
      params.content,
    type: "negative"
  });
}

export { notify, notifySuccess,notifyInfo, notifyError, notifyErrorWithMessage };
