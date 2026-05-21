function RecipeCard({ title, meta, image = true, imageUrl, actionLabel, onAction }) {
  return (
    <article className="recipe-card">
      <div className={`thumb ${image ? 'food' : ''}`} style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
      <div className="card-body">
        <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>{title}</h3>
        <p style={{ margin: '10px 0 0', color: 'var(--text-muted)' }}>{meta}</p>
        {actionLabel && <button type="button" className="btn" style={{ marginTop: 10 }} onClick={onAction}>{actionLabel}</button>}
      </div>
    </article>
  )
}

export default RecipeCard
