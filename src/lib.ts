export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html
}

export function renderToast(message, action) {
  let messageText = ''
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }

  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}

export const calculateTime = (date: Date, countDays: number): Date => {
  const oneMinuteMilliseconds = 60000;
  const oneDayMinute = 1440;
  return new Date(date.getTime() + (countDays * oneDayMinute * oneMinuteMilliseconds))
}
export const dateFormatter = (date: Date): string => {
  return date.toISOString().split("T")[0]
};
