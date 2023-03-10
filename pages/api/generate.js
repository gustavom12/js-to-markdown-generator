import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  try {
    const code = req.body.code;
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: `reescribe mi código con comentarios \n ${code}`,
      temperature: 0.6,
      max_tokens: 2048,
      // x`xxs`
    });
    console.log({ response: JSON.stringify(completion.data) });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "completion.data.choices[0].text" });
  }
}
