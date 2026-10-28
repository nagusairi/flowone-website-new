import { memo, ChangeEvent } from "react";
import { DemoFormData, FormErrors } from "./BookDemoTypes";

interface ContactDetailsStepProps {
  data: DemoFormData;
  errors: FormErrors;
  onChange: (field: keyof DemoFormData, value: string) => void;
}

export const ContactDetailsStep = memo(function ContactDetailsStep({
  data,
  errors,
  onChange,
}: ContactDetailsStepProps) {
  const handleChange = (field: keyof DemoFormData) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(field, e.target.value);
  };

  return (
    <section className="demo-stage" data-stage="2" aria-labelledby="demo-contact-title">
      <h2 id="demo-contact-title" className="demo-heading" tabIndex={-1}>
        Let’s make it
        <br />
        your walkthrough.
      </h2>
      <p className="demo-subtitle">
        Who should we connect with? Add anything you’d like us to focus on.
      </p>

      <div className="demo-fields">
        {/* Name and Phone Pair */}
        <div className="demo-pair">
          <div className="demo-field">
            <label htmlFor="demo-name">Your name</label>
            <input
              id="demo-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Full name"
              value={data.name}
              onChange={handleChange("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "demo-name-error" : undefined}
            />
            {errors.name && (
              <p className="field-error" id="demo-name-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="demo-field">
            <label htmlFor="demo-phone">
              Phone <span className="label-optional">Optional</span>
            </label>
            <input
              id="demo-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91"
              value={data.phone}
              onChange={handleChange("phone")}
            />
          </div>
        </div>

        {/* Focus Note Textarea */}
        <div className="demo-field">
          <label htmlFor="demo-note">
            Anything you’d like us to focus on?{" "}
            <span className="label-optional">Optional</span>
          </label>
          <textarea
            id="demo-note"
            name="note"
            maxLength={1000}
            rows={3}
            placeholder="A workflow, a challenge, or a question…"
            value={data.note}
            onChange={handleChange("note")}
          />
        </div>
      </div>
    </section>
  );
});
