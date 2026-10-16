import { createPortal } from "react-dom";
import { X, ArrowUpRight, Layers3 } from "lucide-react";
import { useContact } from "./ContactProvider";
import useDialog from "./useDialog";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return <ProjectDialog project={project} onClose={onClose} />;
}
function ProjectDialog({ project, onClose }) {
  const dialog = useDialog(onClose);
  const { openContact } = useContact();
  return createPortal(
    <div
      className="modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <article
        ref={dialog}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        tabIndex={-1}
        style={{ "--project-accent": project.accent || "var(--lavender)" }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar projeto"
        >
          <X size={22} />
        </button>
        {project.image ? (
          <img
            className="project-cover"
            src={project.image}
            alt={`Direção visual de ${project.title}`}
          />
        ) : (
          <div className="project-cover project-cover-generated">
            <Layers3 size={100} strokeWidth={0.7} />
            <span>BUILD SOMETHING DIFFERENT.</span>
          </div>
        )}
        <div className="project-modal-body">
          <span className="eyebrow">
            {project.category} · PROJETO CONCEITUAL
          </span>
          <h2 id="project-title">{project.title}</h2>
          <p className="project-description">{project.description}</p>
          <div className="project-tags">
            {project.tags?.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {!!project.stats?.length && (
            <div className="project-stats">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          <div className="project-details">
            {project.details?.map((detail) => (
              <section key={detail.title}>
                <h3>{detail.title}</h3>
                <p>{detail.text}</p>
              </section>
            ))}
          </div>
          <p className="case-note">
            Case e resultados ilustrativos. Uma visão do que podemos construir
            juntos.
          </p>
          <button
            className="primary-button"
            onClick={() => {
              onClose();
              openContact(project.accent === "#c8f36b" ? "Roblox" : "Vídeo");
            }}
          >
            Quero criar algo assim
            <ArrowUpRight size={18} />
          </button>
        </div>
      </article>
    </div>,
    document.body,
  );
}
