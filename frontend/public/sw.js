this.addEventListener("activate", function (event) {
  console.log("service worker activated")
})

this.addEventListener("push", async function (event) {
  console.log("notifications will be displayed here")
  const message = await event.data.json()
  let { title, description, image } = message
  console.log(message, "--- here ---")
  await event.waitUntil(
    this.registration.showNotification(title, {
      body: description,
      icon: image,
      actions: [{ action: "get", title }],
    })
  )
  console.log("--- here --- show notification")
})
