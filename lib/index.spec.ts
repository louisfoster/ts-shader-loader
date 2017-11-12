import compiler from '../test/compiler';
import * as fs from 'fs';
import * as path from 'path';

const shader = (extension) => path.resolve(__dirname, `../test/exampleShader.${extension}`)  ;
const shaderContents = (extension) => JSON.stringify(fs.readFileSync(shader(extension)).toString());


describe('Test extensions', () => {
  test('.glsl', async () => {
    const data = (await compiler(shader('glsl'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output).toBe(`export default ${shaderContents('glsl')}`);
  });

  test('.vs', async () => {
    const data = (await compiler(shader('vs'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output).toBe(`export default ${shaderContents('vs')}`);
  });

  test('.fs', async () => {
    const data = (await compiler(shader('fs'))).toJson();

    if (data.errors && data.errors.length > 0) throw Error(data.errors[0]);

    const output = data.modules[0].source;

    expect(output).toBe(`export default ${shaderContents('fs')}`);
  });
})
