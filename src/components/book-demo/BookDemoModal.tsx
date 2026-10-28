import {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
  FormEvent,
} from "react";
import { DemoFormData, FormErrors, PriorityId } from "./BookDemoTypes";
import { DemoContextPanel } from "./DemoContextPanel";
import { PrioritySelector } from "./PrioritySelector";
import { BusinessDetailsStep } from "./BusinessDetailsStep";
import { ContactDetailsStep } from "./ContactDetailsStep";
import { DemoBriefConfirmation } from "./DemoBriefConfirmation";
import "./book-demo-modal.css";

interface BookDemoModalProps {
  open: boolean;
  onClose: () => void;
}

const INITIAL_FORM_DATA: DemoFormData = {
  priorities: [],
  company: "",
  role: "",
  email: "",
  name: "",
  phone: "",
  note: "",
};

export const BookDemoModal = memo(function BookDemoModal({
  open,
  onClose,
}: BookDemoModalProps) {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [formData, setFormData] = useState<DemoFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Field change handler
  const handleFieldChange = useCallback(
    (field: keyof DemoFormData, value: string | PriorityId[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  // Priorities change handler
  const handlePrioritiesChange = useCallback((next: PriorityId[]) => {
    setFormData((prev) => ({ ...prev, priorities: next }));
    setErrors((prev) => ({ ...prev, priorities: undefined }));
  }, []);

  const handlePriorityError = useCallback((err: string) => {
    setErrors((prev) => ({ ...prev, priorities: err || undefined }));
  }, []);

  // Validation routines
  const validateStep = useCallback(
    (currentStep: number): boolean => {
      const newErrors: FormErrors = {};

      if (currentStep === 0) {
        if (formData.priorities.length === 0) {
          newErrors.priorities =
            "Select a priority, or choose “Help me explore”.";
          setErrors(newErrors);
          return false;
        }
      } else if (currentStep === 1) {
        if (!formData.company.trim()) {
          newErrors.company = "Enter your company name.";
        }
        if (!formData.role.trim()) {
          newErrors.role = "Choose your role.";
        }
        const emailTrimmed = formData.email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
          newErrors.email = "Enter a valid email address.";
        }
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          // Focus first invalid element
          requestAnimationFrame(() => {
            const firstInvalid = dialogRef.current?.querySelector<HTMLElement>(
              '[aria-invalid="true"]'
            );
            firstInvalid?.focus();
          });
          return false;
        }
      } else if (currentStep === 2) {
        if (!formData.name.trim()) {
          newErrors.name = "Enter your name.";
          setErrors(newErrors);
          requestAnimationFrame(() => {
            const firstInvalid = dialogRef.current?.querySelector<HTMLElement>(
              '[aria-invalid="true"]'
            );
            firstInvalid?.focus();
          });
          return false;
        }
      }

      setErrors({});
      return true;
    },
    [formData]
  );

  // Form submit / Next navigation
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    if (step < 2) {
      setStep((prev) => ((prev + 1) as 0 | 1 | 2));
      dialogRef.current
        ?.querySelector(".demo-content")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } else if (step === 2) {
      // Step 2 submitted -> Transition to confirmation
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 0 && step <= 2) {
      setStep((prev) => ((prev - 1) as 0 | 1 | 2));
      setErrors({});
    }
  };

  const handleEditDetails = () => {
    setStep(1); // Return to business details for editing
  };

  // Keyboard navigation, escape dismissal, focus trap, and body scroll lock
  useEffect(() => {
    if (!open) return;

    previousFocus.current = document.activeElement as HTMLElement;
    document.body.classList.add("fo-nav-lock");
    document.body.style.overflow = "hidden";

    // Focus on active stage title or close button
    requestAnimationFrame(() => {
      const heading = dialogRef.current?.querySelector<HTMLElement>(
        ".demo-stage:not([hidden]) h2, .demo-success:not([hidden]) h2"
      );
      if (heading) {
        heading.focus();
      } else {
        closeBtnRef.current?.focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) || []
        );

        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("fo-nav-lock");
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [open, onClose, step]);

  if (!open) return null;

  return (
    <div
      className={`demo-modal-layer ${open ? "is-open" : ""}`}
      role="presentation"
    >
      {/* Softly blurred backdrop scrim */}
      <button
        type="button"
        className="demo-backdrop"
        onClick={onClose}
        aria-label="Close demo form overlay"
      />

      {/* Main Split-Screen Dialog */}
      <div
        ref={dialogRef}
        className="demo-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Request a tailored flowOne demo"
      >
        {/* Left Editorial Panel (35%) */}
        <DemoContextPanel selectedPriorities={formData.priorities} />

        {/* Right Form Main Area (65%) */}
        <div className="demo-main">
          {/* Top Bar with Step Progress and Close Button */}
          <div className="demo-topbar">
            <div className="demo-steps" aria-label="Form progress">
              <span
                className={`demo-stepbar ${step >= 0 ? "active" : ""}`}
              />
              <span
                className={`demo-stepbar ${step >= 1 ? "active" : ""}`}
              />
              <span
                className={`demo-stepbar ${step >= 2 ? "active" : ""}`}
              />
              <span className="demo-step-count" id="demo-count">
                {step === 3 ? "Brief complete" : `Step ${step + 1} of 3`}
              </span>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              className="demo-close"
              onClick={onClose}
              aria-label="Close demo form"
            >
              ×
            </button>
          </div>

          {/* Form Content Steps (0, 1, 2) */}
          {step < 3 ? (
            <form className="demo-form" onSubmit={handleSubmit} noValidate>
              <div className="demo-content">
                {step === 0 && (
                  <PrioritySelector
                    selected={formData.priorities}
                    onChange={handlePrioritiesChange}
                    error={errors.priorities}
                    onErrorChange={handlePriorityError}
                  />
                )}

                {step === 1 && (
                  <BusinessDetailsStep
                    data={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                )}

                {step === 2 && (
                  <ContactDetailsStep
                    data={formData}
                    errors={errors}
                    onChange={handleFieldChange}
                  />
                )}
              </div>

              {/* Persistent Bottom Actions */}
              <div className="demo-footer">
                <div className="demo-actions">
                  <button
                    type="button"
                    className="demo-back"
                    disabled={step === 0}
                    onClick={handleBack}
                  >
                    ← Back
                  </button>

                  <button type="submit" className="demo-next">
                    <span>
                      {step === 2 ? "Request my demo" : "Continue"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <p className="demo-privacy">
                  Interactive preview · No information is sent. By requesting a
                  live demo, you would agree to be contacted about your enquiry.{" "}
                  <a
                    href="https://flowone.in/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </a>
                </p>
              </div>
            </form>
          ) : (
            /* Step 3: Success Confirmation Brief */
            <DemoBriefConfirmation
              data={formData}
              onClose={onClose}
              onEdit={handleEditDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
});
