/* take an array of media items and sort the date on them */

let collection = [
  { time: "2020-10-08T15:28:25.9709411" },
  { time: "2020-10-08T15:29:58.9980937" },
  { time: "2020-10-10T20:47:14.0897931" },
  { time: "2020-10-08T14:22:18.1766176" },
  { time: "2020-10-11T02:31:32.4581747" },
  { time: "2020-10-09T14:55:06.0426507" },
  { time: "2020-10-11T02:44:55.9666134" },
  { time: "2020-10-08T15:29:56.1546104" },
  { time: "2020-10-10T20:53:07.5826441" },
  { time: "2020-10-10T20:48:37.4130218" },
];

export function sortOriginal(a, b) {
  let aA = a.OriginalFileName.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.OriginalFileName.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
  ;
  if (elementsToCompare.sort()[0] === aA) {
    return 1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return -1;
  }
  return 0;
}

export function sortOriginalReverse(a, b) {
  let aA = a.OriginalFileName.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.OriginalFileName.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
  ;
  if (elementsToCompare.sort()[0] === aA) {
    return -1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return 1;
  }
  return 0;
}
export function sortAddedBy(a, b) {
  let aA = a.StartedByUsername.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.StartedByUsername.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return -1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return 1;
  }
  return 0;
}

export function sortAddedByReverse(a, b) {
  let aA = a.StartedByUsername.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.StartedByUsername.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return 1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return -1;
  }
  return 0;
}
export function sortTitle(a, b) {
  let aA = a.Title.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.Title.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return -1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return 1;
  }
  return 0;
}
export function sortTitleReverse(a, b) {
  let aA = a.Title.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.Title.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return 1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return -1;
  }
  return 0;
}

export function sortFileSize(a, b) {
  return a.FileSize - b.FileSize;
}
export function sortFileSizeReverse(a, b) {
  return b.FileSize - a.FileSize;
}

export function sortOldestDate(a, b) {
  return new Date(a.StartDateTime) - new Date(b.StartDateTime);
}
export function sortNewestDate(a, b) {
  return new Date(b.StartDateTime) - new Date(a.StartDateTime);
}

export function sortOldestLogDate(a, b) {
  return new Date(a.DateTime) - new Date(b.DateTime);
}
export function sortNewestLogDate(a, b) {
  return new Date(b.DateTime) - new Date(a.DateTime);
}

export function Paginate(arr, numPerPage) {

  // let remainder = arr.length % numPerPage ;
  let newArray = [];
  for (let i = 0; i < arr.length; i += numPerPage) {
    let temp = arr.slice(i, i + numPerPage);
    newArray.push(temp);
  }

  return newArray;
}

export function sortNetforumLink(a, b) {
  if (a.HasNetforumLink && !b.HasNetforumLink) {
    return 1;
  }
  if (b.HasNetforumLink && !a.HasNetforumLink) {
    return -1;
  }

  return 0;
}
export function sortNetforumLinkReverse(a, b) {
  if (a.HasNetforumLink && !b.HasNetforumLink) {
    return -1;
  }
  if (b.HasNetforumLink && !a.HasNetforumLink) {
    return 1;
  }

  return 0;
}
export function sortKeywordsReverse(a, b) {
  if (a.HasKeywords && !b.HasKeywords) {
    return 1;
  }
  if (b.HasKeywords && !a.HasKeywordsk) {
    return -1;
  }

  return 0;
}
export function sortKeywords(a, b) {
  if (a.HasKeywords && !b.HasKeywords) {
    return -1;
  }
  if (b.HasKeywords && !a.HasKeywordsk) {
    return 1;
  }

  return 0;
}

export function sortStatusReverse(a, b) {
  let aA = a.Status.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.Status.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return 1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return -1;
  }
  return 0;
}
export function sortStatus(a, b) {
  let aA = a.Status.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();
  let bB = b.Status.replace(/[^a-zA-Z]|(\s)/g, "").toLowerCase();

  let elementsToCompare = [aA, bB];
   ;
  if (elementsToCompare.sort()[0] === aA) {
    return -1;
  }
  if (elementsToCompare.sort()[0] === bB) {
    return 1;
  }
  return 0;
}

