import { useState, type FormEvent, type ReactNode } from 'react'
import {
  createOpportunity,
  type CreateOpportunityPayload,
} from '../services/opportunityService'
import type {
  Opportunity,
  OpportunityCategory,
  OpportunityMode,
} from '../types/opportunity'
import { AlertIcon } from './Icons'
import { buttonStyles, fieldStyles } from './ui'

interface SubmitOpportunityFormProps {
  onSuccess: (opportunity: Opportunity) => void
  onCancel: () => void
}

const categories: OpportunityCategory[] = [
  'Hackathon',
  'Internship',
  'Job',
  'Event',
  'Workshop',
]

const modes: OpportunityMode[] = ['Online', 'Offline', 'Hybrid']

const initialForm = {
  title: '',
  organization: '',
  category: 'Internship' as OpportunityCategory,
  description: '',
  mode: 'Online' as OpportunityMode,
  location: 'Remote',
  deadline: '',
  sourceUrl: '',
  tags: '',
}

type FormState = typeof initialForm
type FieldName = keyof FormState
type FieldErrors = Partial<Record<FieldName, string>>

const DESCRIPTION_MAX = 2000

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}
  const title = form.title.trim()
  const organization = form.organization.trim()
  const location = form.location.trim()
  const description = form.description.trim()
  const tags = parseTags(form.tags)

  if (title.length < 3) errors.title = 'Enter a title of at least 3 characters.'
  if (organization.length < 2)
    errors.organization = 'Enter the organization name.'
  if (location.length < 2)
    errors.location = 'Enter a location, or "Remote".'
  if (description.length < 10)
    errors.description = 'Write a description of at least 10 characters.'

  if (form.deadline) {
    const today = new Date().toLocaleDateString('en-CA')
    if (form.deadline < today) errors.deadline = 'Deadline cannot be in the past.'
  }

  if (form.sourceUrl.trim()) {
    try {
      const url = new URL(form.sourceUrl.trim())
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        errors.sourceUrl = 'Use a link starting with http:// or https://.'
      }
    } catch {
      errors.sourceUrl = 'Enter a valid URL, e.g. https://example.com.'
    }
  }

  if (tags.length === 0) errors.tags = 'Add at least one tag.'
  else if (tags.length > 15) errors.tags = 'Use no more than 15 tags.'

  return errors
}

interface FieldProps {
  id: string
  label: string
  required?: boolean
  hint?: ReactNode
  error?: string
  className?: string
  children: (describedBy: string | undefined) => ReactNode
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = '',
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {' *'}
          </span>
        ) : (
          <span className="font-normal text-subtle-foreground"> (optional)</span>
        )}
      </label>
      {children(describedBy)}
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs font-medium text-danger">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-subtle-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function SubmitOpportunityForm({
  onSuccess,
  onCancel,
}: SubmitOpportunityFormProps) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function updateField(field: FieldName, value: string) {
    const nextForm = { ...form, [field]: value }
    setForm(nextForm)
    setSubmitError('')
    if (hasAttemptedSubmit) setErrors(validate(nextForm))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setHasAttemptedSubmit(true)
    setSubmitError('')

    const nextErrors = validate(form)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    const payload: CreateOpportunityPayload = {
      title: form.title.trim(),
      organization: form.organization.trim(),
      category: form.category,
      description: form.description.trim(),
      mode: form.mode,
      location: form.location.trim(),
      deadline: form.deadline || null,
      sourceUrl: form.sourceUrl.trim() || null,
      tags: parseTags(form.tags),
    }

    setIsSubmitting(true)

    try {
      const opportunity = await createOpportunity(payload)
      setForm(initialForm)
      onSuccess(opportunity)
    } catch (submissionError) {
      setSubmitError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const tagPreview = parseTags(form.tags)
  const fieldProps = (field: FieldName, describedBy: string | undefined) => ({
    id: `field-${field}`,
    name: field,
    value: form[field],
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy,
    className: fieldStyles,
  })

  return (
    <form onSubmit={handleSubmit} noValidate className="flex min-h-0 flex-1 flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="field-title" label="Opportunity title" required error={errors.title} className="sm:col-span-2">
            {(describedBy) => (
              <input
                {...fieldProps('title', describedBy)}
                onChange={(event) => updateField('title', event.target.value)}
                maxLength={150}
                placeholder="e.g. Summer Software Engineering Internship"
                aria-required="true"
              />
            )}
          </Field>

          <Field id="field-organization" label="Organization" required error={errors.organization}>
            {(describedBy) => (
              <input
                {...fieldProps('organization', describedBy)}
                onChange={(event) => updateField('organization', event.target.value)}
                maxLength={100}
                placeholder="e.g. Example Technologies"
                autoComplete="organization"
                aria-required="true"
              />
            )}
          </Field>

          <Field id="field-category" label="Category" required>
            {(describedBy) => (
              <select
                {...fieldProps('category', describedBy)}
                onChange={(event) => updateField('category', event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field id="field-mode" label="Mode" required>
            {(describedBy) => (
              <select
                {...fieldProps('mode', describedBy)}
                onChange={(event) => updateField('mode', event.target.value)}
              >
                {modes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <Field id="field-location" label="Location" required error={errors.location}>
            {(describedBy) => (
              <input
                {...fieldProps('location', describedBy)}
                onChange={(event) => updateField('location', event.target.value)}
                maxLength={150}
                placeholder="e.g. Remote or New Delhi"
                aria-required="true"
              />
            )}
          </Field>

          <Field id="field-deadline" label="Application deadline" error={errors.deadline}>
            {(describedBy) => (
              <input
                {...fieldProps('deadline', describedBy)}
                type="date"
                onChange={(event) => updateField('deadline', event.target.value)}
                min={new Date().toLocaleDateString('en-CA')}
              />
            )}
          </Field>

          <Field
            id="field-sourceUrl"
            label="Official source URL"
            error={errors.sourceUrl}
            hint="Prefer the official application page or organizer website."
          >
            {(describedBy) => (
              <input
                {...fieldProps('sourceUrl', describedBy)}
                type="url"
                inputMode="url"
                onChange={(event) => updateField('sourceUrl', event.target.value)}
                placeholder="https://example.com/careers"
              />
            )}
          </Field>

          <Field
            id="field-description"
            label="Description"
            required
            error={errors.description}
            className="sm:col-span-2"
            hint={`${form.description.length}/${DESCRIPTION_MAX} characters. Include eligibility, benefits and how to apply.`}
          >
            {(describedBy) => (
              <textarea
                {...fieldProps('description', describedBy)}
                onChange={(event) => updateField('description', event.target.value)}
                maxLength={DESCRIPTION_MAX}
                rows={4}
                placeholder="What is it, who can apply, and what do participants get?"
                aria-required="true"
                className={`${fieldStyles} resize-y`}
              />
            )}
          </Field>

          <Field
            id="field-tags"
            label="Tags"
            required
            error={errors.tags}
            className="sm:col-span-2"
            hint="Separate tags with commas. Between 1 and 15 tags."
          >
            {(describedBy) => (
              <>
                <input
                  {...fieldProps('tags', describedBy)}
                  onChange={(event) => updateField('tags', event.target.value)}
                  placeholder="Python, AI/ML, Web Development"
                  aria-required="true"
                />
                {tagPreview.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tag preview">
                    {tagPreview.slice(0, 15).map((tag, index) => (
                      <li
                        key={`${tag}-${index}`}
                        className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </Field>
        </div>

        {submitError && (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-lg border border-danger/25 bg-danger-soft px-4 py-3 text-sm text-danger"
          >
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface-muted/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className={buttonStyles.secondary}
        >
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className={buttonStyles.primary}>
          {isSubmitting && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
          )}
          {isSubmitting ? 'Submitting...' : 'Submit opportunity'}
        </button>
      </div>
    </form>
  )
}
