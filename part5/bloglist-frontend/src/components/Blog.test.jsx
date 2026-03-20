import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('renders title and author, then shows URL after clicking view', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Tomi',
    url: 'https://react-testing-library',
    likes: 0,
    user: { name: 'Test User' }
  }

  const { container } = render(<Blog blog={blog} />)

  // 1. Check initial state (Title and Author visible)
  expect(screen.getByText(/Component testing is done/i)).toBeDefined()
  expect(screen.getByText(/Tomi/i)).toBeDefined()

  // 2. Verify URL is NOT visible yet
  const urlBeforeClick = container.querySelector('.url')
  expect(urlBeforeClick).toBeNull()

  // 3. Click the 'view' button
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  // 4. Verify URL is now visible and has correct content
  const urlAfterClick = container.querySelector('.url')
  expect(urlAfterClick).not.toBeNull()
  expect(urlAfterClick).toHaveTextContent('https://react-testing-library')
})

test('renders likes after clicking the view button', async () => {
  const blog = {
    title: 'Testing likes validation',
    author: 'Tomi',
    url: 'https://react-testing-library',
    likes: 12,
    user: { name: 'Test User' }
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  
  // 1. Verify likes are NOT visible initially
  const likesBefore = screen.queryByText('12', { exact: false })
  expect(likesBefore).toBeNull()

  // 2. Click the 'view' button to show details
  const button = screen.getByText('view')
  await user.click(button)

  // 3. Check that the likes are now present in the DOM
  // Using a partial match because it's usually rendered as "12 <button>like</button>"
  const likesAfter = screen.getByText('12', { exact: false })
  expect(likesAfter).toBeDefined()
})

test('clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing likes validation',
    author: 'Tomi',
    url: 'https://react-testing-library',
    likes: 12,
    user: { name: 'Test User' }
    }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
