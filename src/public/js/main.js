document.addEventListener('click', (e) => {
  console.log('Escuchando el evento CLICK')
  if (e.target.matches('button')) {
    const article = e.target.closest('article')
    const id = article.dataset.id

    fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        article.remove()
      }
    })
  }
})
