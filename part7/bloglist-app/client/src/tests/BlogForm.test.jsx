import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import BlogForm from '../components/BlogForm'

test('form calls event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)
  const user = userEvent.setup()

  const inputTitle = screen.getByRole('textbox', { name: /title/i })
  const inputAuthor = screen.getByRole('textbox', { name: /author/i })
  const inputUrl = screen.getByRole('textbox', { name: /url/i })
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'testing of forms title')
  await user.type(inputAuthor, 'testing of forms author')
  await user.type(inputUrl, 'testing of forms url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing of forms author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing of forms url')
})
