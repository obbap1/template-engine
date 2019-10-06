class Parse {
  constructor(replacements = {}) {
    this.replacements = replacements;
    // Default tag to start parsing from
    this.DEFAULT_REGION = "body";
    // Default tags to not parse
    this.DEFAULT_TAGS_TO_EXCLUDE = ["script"];
    //Default detectors
    this.DEFAULT_OPEN_DETECTOR = "{{";
    this.DEFAULT_CLOSE_DETECTOR = "}}";
    //Regular expression to find the items from innerText
    this.REG_EXP = new RegExp(
      `(${this.DEFAULT_OPEN_DETECTOR}).*(${this.DEFAULT_CLOSE_DETECTOR})`,
      "g"
    );
  }
  // Change default tag
  setRegion(region) {
    this.DEFAULT_REGION = region;
  }
  // Change detectors
  setDetectors(openDetector = "{{", closeDetector = "}}") {
    this.DEFAULT_OPEN_DETECTOR = openDetector;
    this.DEFAULT_CLOSE_DETECTOR = closeDetector;
  }
  //Add to tags be excluded
  setTagsToExclude(tags = []) {
    this.DEFAULT_TAGS_TO_EXCLUDE = [...this.DEFAULT_TAGS_TO_EXCLUDE, ...tags];
  }
  //Parse HTML Body
  parse() {
    const region = document.getElementsByTagName(this.DEFAULT_REGION)[0];

    if (region.childElementCount < 1) {
      return "Empty HTML Region";
    }

    //Welp
    const self = this;

    region.innerHTML = region.innerHTML.replace(this.REG_EXP, function(answer){
        const result = answer.split(" ").reduce((acc,item) => {
            if(item.startsWith(self.DEFAULT_OPEN_DETECTOR)){
                //get the word inbetween the braces
                const theActualWord = item.match(/\w*/g).filter(item => !!item);
                //is the accumulator still empty
                const which = acc ? acc : answer;
                //Replace the words with their object representations
                acc = which.replace(`{{${theActualWord}}}`, self.replacements[theActualWord]);
                
            }
            return acc;
        },'');
        return result;

    });

  }

  render() {
    this.parse();
  }
}
