import { useState, type FormEvent } from 'react'
import {
  createOpportunity,
  type CreateOpportunityPayload,
} from '../services/opportunityService'
import type {
  Opportunity,
  OpportunityCategory,
  OpportunityMode,
} from '../types/opportunity'

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

const fieldClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-[#111722] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#a7f36b]'

const labelClass = 'block text-sm font-medium text-slate-200'

export function SubmitOpportunityForm({
  onSuccess,
  onCancel,
}: SubmitOpportunityFormProps) {
  const [form, setForm] = useState(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function updateField(
    field: keyof typeof initialForm,
    value: string,
  ) {
    setForm((previous) => ({ ...previous, [field]: value }))
    setError('')
    setSuccess('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    const tags = form.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    if (tags.length === 0) {
      setError('Please add at least one tag, separated by commas.')
      return
    }

    if (tags.length > 15) {
      setError('Please enter no more than 15 tags.')
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
      tags,
    }

    setIsSubmitting(true)

    try {
      const opportunity = await createOpportunity(payload)
      setSuccess('Opportunity submitted successfully!')
      setForm(initialForm)
      onSuccess(opportunity)
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="mt-8 rounded-2xl border border-white/10 bg-[#10151f] p-5 sm:p-8"
      aria-labelledby="submit-opportunity-heading"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#a7f36b]">
            CONTRIBUTE TO TECHPULSE
          </p>
          <h2
            id="submit-opportunity-heading"
            className="mt-2 text-2xl font-semibold text-white"
          >
            Submit an opportunity
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Share a useful opportunity with fellow students. Submit only
            information you can verify from a reliable source.
          </p>
        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Opportunity title *
            <input
              className={fieldClass}
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              minLength={3}
              maxLength={150}
              placeholder="e.g. Summer Software Engineering Internship"
              required
            />
          </label>

          <label className={labelClass}>
            Organization *
            <input
              className={fieldClass}
              value={form.organization}
              onChange={(event) =>
                updateField('organization', event.target.value)
              }
              minLength={2}
              maxLength={100}
              placeholder="e.g. Example Technologies"
              required
            />
          </label>

          <label className={labelClass}>
            Category *
            <select
              className={fieldClass}
              value={form.category}
              onChange={(event) =>
                updateField('category', event.target.value)
              }
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Mode *
            <select
              className={fieldClass}
              value={form.mode}
              onChange={(event) => updateField('mode', event.target.value)}
              required
            >
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </label>

          <label className={labelClass}>
            Location *
            <input
              className={fieldClass}
              value={form.location}
              onChange={(event) =>
                updateField('location', event.target.value)
              }
              minLength={2}
              maxLength={150}
              placeholder="e.g. Remote or New Delhi"
              required
            />
          </label>

          <label className={labelClass}>
            Application deadline
            <input
              type="date"
              className={fieldClass}
              value={form.deadline}
              onChange={(event) =>
                updateField('deadline', event.target.value)
              }
              min={new Date().toLocaleDateString('en-CA')}
            />
          </label>
        </div>

        <label className={labelClass}>
          Description *
          <textarea
            className={fieldClass}
            value={form.description}
            onChange={(event) =>
              updateField('description', event.target.value)
            }
            minLength={10}
            maxLength={2000}
            rows={4}
            placeholder="Explain the opportunity, eligibility, benefits and how students can apply."
            required
          />
        </label>

        <label className={labelClass}>
          Official source URL
          <input
            type="url"
            className={fieldClass}
            value={form.sourceUrl}
            onChange={(event) =>
              updateField('sourceUrl', event.target.value)
            }
            placeholder="https://example.com/careers"
          />
          <span className="mt-2 block text-xs font-normal text-slate-500">
            Prefer an official application page or organizer website.
          </span>
        </label>

        <label className={labelClass}>
          Tags *
          <input
            className={fieldClass}
            value={form.tags}
            onChange={(event) => updateField('tags', event.target.value)}
            placeholder="Python, AI/ML, Web Development"
            required
          />
          <span className="mt-2 block text-xs font-normal text-slate-500">
            Separate tags with commas. Add between 1 and 15 tags.
          </span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="rounded-xl border border-[#a7f36b]/20 bg-[#a7f36b]/10 p-4 text-sm text-[#a7f36b]"
          >
            {success}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#a7f36b] px-5 py-3 text-sm font-semibold text-[#10150d] transition hover:bg-[#b8ff80] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit opportunity'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}