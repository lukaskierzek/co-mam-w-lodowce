function RecipeCard({ title, meta, imageUrl, actionLabel, onAction }) {
  return (
    <article className="recipe-card">
      <div className="thumb food" style={imageUrl ? { backgroundImage: `url('${imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined} />
      <div className="card-body">
        <div className="card-title">
          <h3 style={{ margin: 0, color: 'var(--primary-dark)' }}>{title}</h3>
        </div>
        <div className="card-meta">
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>{meta}</p>
        </div>
      </div>
      {actionLabel && <button type="button" className="btn" style={{ marginTop: 10 }} onClick={onAction}>{actionLabel}</button>}
    </article>
  )
}

export default RecipeCard
