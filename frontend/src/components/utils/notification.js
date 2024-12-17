export default async function checkNotification(type) {
    const response  = await fetch('http://localhost:5006/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type
        }),
      }
    )
    const notification = response.json()
    console.log(notification)
    return notification
}