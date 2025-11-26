import { describe, it, expect } from 'vitest';
import { substituteVariables, processContentBlocks } from '../src/utils/templateEngine';

describe('templateEngine', () => {
  it('substitutes variables in text', () => {
    const text = 'Hello {{name}}, welcome to {{company}}!';
    const vars = { name: 'Alice', company: 'Acme' };
    expect(substituteVariables(text, vars)).toBe('Hello Alice, welcome to Acme!');
  });

  it('processes content blocks and substitutes variables', () => {
    const blocks = ['intro', 'closing'];
    const contentBlocks = {
      intro: 'Hello {{name}}',
      closing: 'Sincerely, {{name}}',
    };
    const vars = { name: 'Bob' };
    const result = processContentBlocks(blocks, contentBlocks, vars);
    expect(result).toEqual(['Hello Bob', 'Sincerely, Bob']);
  });
});
