import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  X,
  ArrowLeft,
} from "lucide-react";
import useDialog from "./useDialog";

const ContactContext = createContext(null);
export function useContact() {
  return useContext(ContactContext);
}

function ContactModal({ initialArea, onClose }) {
  const dialog = useDialog(onClose);
  const [area, setArea] = useState(initialArea || "Vídeo");
  const [briefing, setBriefing] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => {
    if (briefing)
      dialog.current?.querySelector(".briefing-result pre")?.focus();
  }, [briefing, dialog]);
  function prepare(event) {
    event.preventDefault();
    setBriefing(
      `BRIEFING CRIATIVO · KYRION MT\n\nUniverso: ${area}\nNome: ${formValues.name.trim()}\nE-mail: ${formValues.email.trim()}\n\nA ideia:\n${formValues.message.trim()}\n\nDocumento preparado no portfólio de Kyrion MT. Nenhuma mensagem foi enviada automaticamente.`,
    );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([briefing], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "briefing-kyrion-mt.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(briefing);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return createPortal(
    <div
      className="modal-backdrop"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="contact-modal"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        tabIndex={-1}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar contato"
        >
          <X size={22} />
        </button>
        <span className="eyebrow">O PRÓXIMO GRANDE PROJETO</span>
        <h2 id="contact-title">
          Começa com
          <br />
          uma <em>boa conversa.</em>
        </h2>
        {!briefing ? (
          <form onSubmit={prepare}>
            <fieldset>
              <legend>Em qual universo vamos criar?</legend>
              <div className="contact-options">
                {["Vídeo", "Roblox", "Os dois"].map((option) => (
                  <label
                    key={option}
                    className={area === option ? "selected" : ""}
                  >
                    <input
                      type="radio"
                      name="area"
                      value={option}
                      checked={area === option}
                      onChange={() => setArea(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="form-row">
              <label>
                Seu nome
                <input
                  autoComplete="name"
                  placeholder="Como posso te chamar?"
                  name="name"
                  required
                  maxLength={100}
                  value={formValues.name}
                  onChange={(e) =>
                    setFormValues({ ...formValues, name: e.target.value })
                  }
                />
              </label>
              <label>
                Seu e-mail
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  name="email"
                  required
                  maxLength={254}
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                />
              </label>
            </div>
            <label>
              Conte um pouco da sua ideia
              <textarea
                name="message"
                placeholder="O que você quer criar? Vale contar os objetivos, as referências e o prazo."
                required
                minLength={10}
                maxLength={5000}
                rows={4}
                value={formValues.message}
                onChange={(e) =>
                  setFormValues({ ...formValues, message: e.target.value })
                }
              />
            </label>
            <button className="primary-button" type="submit">
              Preparar meu briefing
              <ArrowUpRight size={20} />
            </button>
            <p className="form-note">
              Prepare e baixe sua ideia. Este formulário não envia mensagens e
              não armazena seus dados.
            </p>
          </form>
        ) : (
          <div className="briefing-result">
            <div className="briefing-status">
              <Check size={18} />
              <span>Seu briefing está pronto para compartilhar.</span>
            </div>
            <pre tabIndex={0}>{briefing}</pre>
            <div className="briefing-actions">
              <button className="primary-button" onClick={download}>
                Baixar briefing
                <Download size={18} />
              </button>
              <button className="secondary-button" onClick={copy}>
                {copied ? <Check size={17} /> : <Copy size={17} />}{" "}
                {copied ? "Copiado!" : "Copiar texto"}
              </button>
            </div>
            <p role="status" className="form-note">
              {copyError
                ? "Não foi possível copiar. Você pode selecionar o texto acima ou baixar o arquivo."
                : "Nada foi enviado. Compartilhe o arquivo pelo canal de contato que preferir."}
            </p>
            <button
              className="text-button"
              onClick={() => {
                setBriefing("");
                setCopied(false);
              }}
            >
              <ArrowLeft size={15} />
              Editar minha ideia
            </button>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}

export function ContactProvider({ children }) {
  const [contact, setContact] = useState(null);
  return (
    <ContactContext.Provider
      value={{
        openContact: (area = "") => setContact({ area }),
        closeContact: () => setContact(null),
      }}
    >
      {children}
      {contact && (
        <ContactModal
          initialArea={contact.area}
          onClose={() => setContact(null)}
        />
      )}
    </ContactContext.Provider>
  );
}
