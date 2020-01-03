import { NodeType } from '@stoplight/types';
import * as fs from 'fs';
import * as path from 'path';
import httpOperation from '../../__fixtures__/operations/put-todos';
import httpService from '../../__fixtures__/services/petstore';
import { buildNodeMarkdownTree } from '../buildNodeMarkdownTree';

const basicArticle = fs.readFileSync(path.join(__dirname, '../../__fixtures__/articles/basic.md'));
const modelWithNoExamples = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../__fixtures__/models/model-with-no-examples.json')).toString(),
);
const modelWithOneExample = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../__fixtures__/models/model-with-one-example.json')).toString(),
);
const modelWithThreeExamples = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../__fixtures__/models/model-with-three-examples.json')).toString(),
);

describe('buildNodeMarkdownTree', () => {
  describe('Article', () => {
    it('works with the basic article', () => {
      expect(buildNodeMarkdownTree(NodeType.Article, basicArticle)).toMatchSnapshot();
    });
  });

  describe('Model', () => {
    it('renders no tabs with no examples', () => {
      expect(buildNodeMarkdownTree(NodeType.Model, modelWithNoExamples)).toMatchSnapshot();
    });
  });

  describe('Model', () => {
    it('renders no tabs with one example', () => {
      expect(buildNodeMarkdownTree(NodeType.Model, modelWithOneExample)).toMatchSnapshot();
    });
  });

  describe('Model', () => {
    it('renders no tabs with three examples', () => {
      expect(buildNodeMarkdownTree(NodeType.Model, modelWithThreeExamples)).toMatchSnapshot();
    });
  });

  describe('Operations', () => {
    it('works with Http Operations', () => {
      expect(buildNodeMarkdownTree(NodeType.Model, httpOperation)).toMatchSnapshot();
    });
  });

  describe('Services', () => {
    it('works with HTTP Services', () => {
      expect(buildNodeMarkdownTree(NodeType.Model, httpService)).toMatchSnapshot();
    });
  });
});
