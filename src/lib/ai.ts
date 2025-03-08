import { openai } from '@ai-sdk/openai';

// Default model to use - can be overridden in specific implementations
export const defaultModel = process.env.AI_MODEL || 'gpt-3.5-turbo';

// Export the OpenAI client instance
export { openai };
