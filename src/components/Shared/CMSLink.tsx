import NextLink from 'next/link'
import React from 'react'

import { Button } from 'UI'
import { Link } from 'UI/Link'
import { SectionHeaderStoryblok } from 'common/types'
import { parseStoryblokLink } from 'common/utils/content'

type CMSLinkProps = {
  href: SectionHeaderStoryblok['button_link']
  onClick?: () => void
  css?: any
  children?: any
  linkStyle?: any
}

export const CMSLink: React.FC<CMSLinkProps> = ({
  href,
  children,
  linkStyle = {
    type: 'button',
  },
  ...props
}) => {
  const link = parseStoryblokLink(href)

  if (!link) return null

  const url = href?.anchor ? `${link.url}#${href?.anchor}` : link.url

  //TODO: refactor remove repeated code
  switch (link.type) {
    case 'internal':
      return (
        <NextLink href={url} passHref>
          {linkStyle.type === 'button' ? (
            <Button as="a" variant={linkStyle.variant} {...props}>
              {children}
            </Button>
          ) : (
            <Link
              variant={linkStyle.variant}
              icon={linkStyle.icon}
              iconVariant={linkStyle.iconVariant}
              {...props}
            >
              {children}
            </Link>
          )}
        </NextLink>
      )

    case 'external':
      return linkStyle.type === 'button' ? (
        <Button
          as="a"
          target="_blank"
          rel="noopener noreferrer"
          variant={linkStyle.variant}
          href={url}
          {...props}
        >
          {children}
        </Button>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          variant={linkStyle.variant}
          href={url}
          {...props}
        >
          {children}
        </Link>
      )

    case 'email':
      return linkStyle.type === 'button' ? (
        <Button as="a" variant={linkStyle.variant} href={url} {...props}>
          {children}
        </Button>
      ) : (
        <Link
          variant={linkStyle.variant}
          href={url}
          icon={linkStyle.icon}
          iconVariant={linkStyle.iconVariant}
          {...props}
        >
          {children}
        </Link>
      )

    default:
      return null
  }
}
