import MainContainer from "@/components/pageLayout/mainContainer";
import Navbar from "@/components/pageLayout/navbar";
import PageContent from "@/components/pageLayout/pageContent";
import Footer from "@/components/pageLayout/footer";
import SmallContainer from "@/components/misc/smallContainer";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import MarkdownRenderer from "@/components/misc/markdownRenderer";
import { useState } from "react";
import PopupContainer from "@/components/pageLayout/popupContainer";

const SummaryPage = () => {
  const markdown = `
  # Markdown Cheat Sheet

Markdown is a lightweight markup language that allows you to style text and add basic formatting to your documents. Below are some of the most commonly used Markdown functionalities:

## Headers

You can create headers using the '#' symbol. The number of '#' symbols determines the header level. For example:
# Heading 1
## Heading 2
### Heading 3
#### Heading 4

## Emphasis

You can add emphasis to your text using asterisks (*) or underscores (_). For example:
*This text will be italic.*
_This text will also be italic._

**This text will be bold.**
__This text will also be bold.__

## Lists

You can create both ordered and unordered lists.

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links

You can create hyperlinks using square brackets and parentheses.

[OpenAI's website](https://openai.com)

## Images

You can also embed images using the same syntax as links, but with a '!' in front.

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

## Blockquotes

You can create blockquotes using the '>' symbol.

> This is a blockquote.
> It can span multiple lines.

## Code

You can display code snippets in-line or in blocks.
  `;
  let markdownElement = (
    <MarkdownRenderer markdown={markdown}></MarkdownRenderer>
  );
  const [display, setDisplay] = useState(false);
  return (
    <>
      <MainContainer>
        {/*Navbar*/}
        <Navbar />
        {/*Content*/}
        <PageContent>
          <div className="float-left hidden h-full w-3/12 p-3 sm:block">
            <SmallContainer title="Summary" extraClass="mb-5">
              test
            </SmallContainer>
            <SmallContainer title="Description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              suscipit porta eros et tincidunt. Donec purus augue, blandit et
              dictum in, fermentum sed tellus. Integer eget turpis nisi.
              Maecenas in.
            </SmallContainer>
          </div>
          <div className="float-right h-full w-full p-0 pb-0 sm:w-9/12 sm:p-3">
            <div
              className={
                "animated-inactive h-full w-full flex-col rounded-md bg-white text-black " +
                (display ? "hidden" : "flex")
              }
            >
              <div className="flex w-full items-center rounded-md p-3">
                <div className="flex-grow">
                  <span className=" block text-xl font-medium sm:hidden">
                    Summary
                  </span>
                </div>
                <div className="flex items-center">
                  <BsFullscreen
                    className="cursor-pointer"
                    onClick={() => setDisplay(true)}
                    title="Fullscreen"
                  />
                </div>
              </div>
              <div className=" flex w-full flex-grow overflow-y-auto rounded-md p-3">
                {markdownElement}
              </div>
            </div>
          </div>
        </PageContent>
        {/*Footer*/}
        <Footer height={1}></Footer>
      </MainContainer>
      <PopupContainer display={display}>
        <div className="animated-inactive mx-auto flex w-full flex-col rounded-md bg-white p-3 text-black opacity-100 sm:w-10/12 ">
          <div className="flex w-full items-center rounded-md">
            <div className="flex-grow"></div>
            <div className="flex items-center">
              <BsFullscreenExit
                className="cursor-pointer"
                onClick={() => setDisplay(false)}
              />
            </div>
          </div>
          <div className=" flex w-full flex-grow rounded-md p-3">
            {markdownElement}
          </div>
        </div>
      </PopupContainer>
    </>
  );
};

export default SummaryPage;
