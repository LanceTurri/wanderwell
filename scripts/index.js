(() => {
  // src/components/explorer/emptyState.ts
  var buildEmptyState = () => {
    const wrappingElement = document.createElement("div");
    wrappingElement.classList.add("explorer__empty");
    const titleElement = document.createElement("h3");
    titleElement.classList.add("explorer__empty-title");
    titleElement.innerText = "No files found!";
    const subtitleElement = document.createElement("p");
    subtitleElement.classList.add("explorer__empty-subtitle");
    subtitleElement.innerText = "Try choosing a different folder in the sidebar.";
    wrappingElement.appendChild(titleElement);
    wrappingElement.appendChild(subtitleElement);
    return wrappingElement;
  };
  var emptyState_default = buildEmptyState;

  // src/handlers/onSelectFolderHandler.ts
  var onSelectFolderHandler = (event) => {
    const element = event.currentTarget;
    if (!element) {
      console.log("SELECTED CLICK HANDLER: No element was found on event");
      return;
    }
    const folderName = element.getAttribute("data-folder");
    const displayName = element.getAttribute("data-name");
    if (!folderName || !displayName) {
      console.log("SELECTED CLICK HANDLER: No folderName or displayName was found");
      return;
    }
    document.body.dispatchEvent(new CustomEvent("item--selected", {
      detail: {
        identifier: folderName,
        displayName
      }
    }));
  };

  // src/utils/readableFileSize.ts
  var readableFileSize = (bytes) => {
    if (bytes === 0) {
      return "--";
    }
    const suffixes = ["B", "kB", "MB", "GB", "TB"];
    const bytesConverted = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Number((bytes / Math.pow(1024, bytesConverted)).toFixed(2)) * 1} ${suffixes[bytesConverted]}`;
  };

  // src/utils/underscorize.ts
  var underscorize = (name) => {
    return name.replace(/\s/g, "_").toLowerCase();
  };

  // src/components/explorer/explorerItem.ts
  var buildExplorerItem = (item) => {
    const wrappingElement = document.createElement("div");
    wrappingElement.classList.add("explorer__filelist-item", `explorer__filelist-item--${item.type}`);
    wrappingElement.setAttribute(`data-${item.type}`, underscorize(item.name));
    wrappingElement.setAttribute("data-name", item.name);
    wrappingElement.setAttribute("role", "button");
    if (item.type === "folder") {
      wrappingElement.addEventListener("click", onSelectFolderHandler);
    }
    const titleElement = document.createElement("div");
    titleElement.classList.add("explorer__filelist-title", "explorer__item--primary");
    titleElement.innerText = item.name;
    const lastModifiedElement = document.createElement("div");
    lastModifiedElement.classList.add("explorer__filelist-subtitle", "explorer__item--secondary");
    lastModifiedElement.innerText = item.modified.toLocaleDateString();
    const fileSizeElement = document.createElement("div");
    fileSizeElement.classList.add("explorer__filelist-subtitle", "explorer__item--secondary");
    fileSizeElement.innerText = readableFileSize(item.size);
    wrappingElement.appendChild(titleElement);
    wrappingElement.appendChild(lastModifiedElement);
    wrappingElement.appendChild(fileSizeElement);
    return wrappingElement;
  };
  var explorerItem_default = buildExplorerItem;

  // src/components/explorer/metadataHeader.ts
  var buildMetadataHeader = () => {
    const metadataWrapper = document.createElement("div");
    metadataWrapper.classList.add("explorer__metadata");
    metadataWrapper.innerHTML = `
    <div class="explorer__metadata-item explorer__item--primary">
      File Name
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Modified
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Size
    </div>
  `;
    return metadataWrapper;
  };
  var metadataHeader_default = buildMetadataHeader;

  // src/components/fileExplorer.ts
  var generateFileExplorer = (fileListing2) => {
    if (fileListing2.length === 0) {
      return [emptyState_default()];
    }
    const fileListWrapper = document.createElement("div");
    fileListWrapper.classList.add("explorer__filelist");
    fileListWrapper.replaceChildren(...fileListing2.map((file) => explorerItem_default(file)));
    return [metadataHeader_default(), fileListWrapper];
  };
  var fileExplorer_default = generateFileExplorer;

  // src/handlers/file-tree/expandFileTree.ts
  var expandFileTree = (folderName, force = void 0) => {
    document.querySelector(`.listing__item[data-folder=${folderName}]`)?.classList.toggle("listing__item--expanded", typeof force === "boolean" ? !force : void 0);
    document.querySelector(`.listing__group[data-group=${folderName}]`)?.classList.toggle("listing__group--hidden", force);
  };

  // src/handlers/onExpandItemHandler.ts
  var onExpandItemHandler = (event) => {
    event.stopPropagation();
    const element = event.currentTarget;
    if (!element) {
      console.log("EXPAND CLICK HANDLER: No element was found on event");
      return;
    }
    const folderName = element.getAttribute("data-folder");
    if (!folderName) {
      console.log("EXPAND CLICK HANDLER: No folderName was found");
      return;
    }
    expandFileTree(folderName);
  };

  // src/components/file-tree/expandButton.ts
  var buildExpandButton = (name) => {
    const listingExpandElement = document.createElement("button");
    listingExpandElement.classList.add("listing__item-expand");
    listingExpandElement.type = "button";
    listingExpandElement.innerText = "+";
    listingExpandElement.setAttribute("data-folder", underscorize(name));
    listingExpandElement.addEventListener("click", onExpandItemHandler);
    return listingExpandElement;
  };
  var expandButton_default = buildExpandButton;

  // src/components/file-tree/treeItem.ts
  var buildTreeItem = (item) => {
    const listingItem = document.createElement("li");
    listingItem.classList.add("listing__item");
    listingItem.setAttribute("data-folder", underscorize(item.name));
    listingItem.setAttribute("data-name", item.name);
    listingItem.addEventListener("click", onSelectFolderHandler);
    const listingTextElement = document.createElement("span");
    listingTextElement.classList.add("listing__item-text");
    listingTextElement.innerText = item.name;
    listingItem.appendChild(listingTextElement);
    if (item.children && item.children.some((item2) => item2.type === "folder")) {
      listingItem.appendChild(expandButton_default(item.name));
    }
    return listingItem;
  };
  var treeItem_default = buildTreeItem;

  // src/components/file-tree/treeGroup.ts
  var buildTreeGroup = (children, id, isHidden = true) => {
    const childFolders = children.filter((item) => item.type === "folder");
    const wrappingElement = document.createElement("ul");
    wrappingElement.classList.add("listing__group");
    wrappingElement.setAttribute("data-group", underscorize(id));
    if (isHidden) {
      wrappingElement.classList.add("listing__group--hidden");
    }
    childFolders.forEach((folder) => {
      const treeItem = treeItem_default(folder);
      wrappingElement.appendChild(treeItem);
      if (folder.children && folder.children.some((child) => child.type === "folder")) {
        const treeGroup = buildTreeGroup(folder.children, folder.name);
        wrappingElement.appendChild(treeGroup);
      }
    });
    return wrappingElement;
  };
  var treeGroup_default = buildTreeGroup;

  // src/components/fileTree.ts
  var generateFileTree = (fileListing2) => {
    return treeGroup_default(fileListing2, "root", false);
  };
  var fileTree_default = generateFileTree;

  // src/mocks/fileListing.ts
  var fileListing = `[
  {
    "type": "folder",
    "name": "User",
    "modified": 1652408476554,
    "size": 0,
    "children": [
      {
        "type": "folder",
        "name": "Documents",
        "modified": 1652408476554,
        "size": 0,
        "children": []
      },
      {
        "type": "folder",
        "name": "Music",
        "modified": 1652408476554,
        "size": 0,
        "children": [
          {
            "type": "folder",
            "name": "Some Nights",
            "modified": 1652408476554,
            "size": 0,
            "children": [
              {
                "type": "file",
                "name": "Some Nights (Intro).mp3",
                "modified": 1590244187352,
                "size": 6003179
              },
              {
                "type": "file",
                "name": "Some Nights.mp3",
                "modified": 1590244187318,
                "size": 11573530
              },
              {
                "type": "file",
                "name": "Carry On.mp3",
                "modified": 1590244187332,
                "size": 11626820
              },
              {
                "type": "file",
                "name": "It Gets Better.mp3",
                "modified": 1590244187359,
                "size": 9137873
              },
              {
                "type": "file",
                "name": "Why Am I The One.mp3",
                "modified": 1590244187339,
                "size": 11960142
              },
              {
                "type": "file",
                "name": "All Alone.mp3",
                "modified": 1590244187345,
                "size": 7843245
              },
              {
                "type": "file",
                "name": "All Alright.mp3",
                "modified": 1590244187324,
                "size": 9991555
              },
              {
                "type": "file",
                "name": "One Foot.mp3",
                "modified": 1590244187311,
                "size": 8969645
              },
              {
                "type": "file",
                "name": "Stars.mp3",
                "modified": 1590244187305,
                "size": 17025808
              },
              {
                "type": "file",
                "name": "Out On The Town.mp3",
                "modified": 1590244187298,
                "size": 10949726
              }
            ]
          },
          {
            "type": "folder",
            "name": "Dark Side of the Moon",
            "modified": 1652408476554,
            "size": 0,
            "children": [
              {
                "type": "file",
                "name": "Speak to Me.mp3",
                "modified": 1589518777188,
                "size": 1068251
              },
              {
                "type": "file",
                "name": "Breathe (In the Air).mp3",
                "modified": 1589518777239,
                "size": 2735509
              },
              {
                "type": "file",
                "name": "On the Run.mp3",
                "modified": 1589518777193,
                "size": 3629503
              },
              {
                "type": "file",
                "name": "Time.mp3",
                "modified": 1589518777247,
                "size": 6646321
              },
              {
                "type": "file",
                "name": "The Great Gig in the Sky.mp3",
                "modified": 1589518777198,
                "size": 4564924
              },
              {
                "type": "file",
                "name": "Money.mp3",
                "modified": 1589518777222,
                "size": 6148533
              },
              {
                "type": "file",
                "name": "Us and Them.mp3",
                "modified": 1589518777211,
                "size": 7530736
              },
              {
                "type": "file",
                "name": "Any Colour You Like.mp3",
                "modified": 1589518777217,
                "size": 3326083
              },
              {
                "type": "file",
                "name": "Brain Damage.mp3",
                "modified": 1589518777204,
                "size": 3649987
              },
              {
                "type": "file",
                "name": "Eclipse.mp3",
                "modified": 1589518777230,
                "size": 2109800
              }
            ]
          }
        ]
      },
      {
        "type": "folder",
        "name": "Pictures",
        "modified": 1652408476554,
        "size": 0,
        "children": [
          {
            "type": "file",
            "name": "-1.png",
            "modified": 1621794974758,
            "size": 177087
          },
          {
            "type": "file",
            "name": "bulbs.png",
            "modified": 1566063889960,
            "size": 36134
          },
          {
            "type": "file",
            "name": "constellation.png",
            "modified": 1566063889998,
            "size": 40376
          },
          {
            "type": "file",
            "name": "mars.png",
            "modified": 1566063889959,
            "size": 55412
          },
          {
            "type": "file",
            "name": "mountains.png",
            "modified": 1566063889961,
            "size": 69491
          },
          {
            "type": "file",
            "name": "underwater.png",
            "modified": 1566063889963,
            "size": 40184
          },
          {
            "type": "file",
            "name": "unicorn.png",
            "modified": 1566063889958,
            "size": 76205
          },
          {
            "type": "file",
            "name": "wild.png",
            "modified": 1566063889963,
            "size": 215708
          }
        ]
      }
    ]
  }
]`;

  // src/apis/getFileListing.ts
  var getFileListing = async () => {
    const fileJson = JSON.parse(fileListing, (key, value) => {
      if (key === "modified") {
        return new Date(value);
      }
      return value;
    });
    return Promise.resolve(fileJson);
  };
  var getFileListing_default = getFileListing;

  // src/utils/findTreeNode.ts
  var findTreeNode = (fileListing2, identifier) => {
    for (const node of fileListing2) {
      if (underscorize(node.name) === identifier) {
        return node;
      }
      if (node.children) {
        const matchedNode = findTreeNode(node.children, identifier);
        if (matchedNode) {
          return matchedNode;
        }
      }
    }
    return;
  };

  // src/handlers/file-tree/selectItem.ts
  var selectItem = (folderName) => {
    document.querySelector(".listing__item--selected")?.classList.remove("listing__item--selected");
    document.querySelector(`.listing__item[data-folder=${folderName}]`)?.classList.toggle("listing__item--selected");
    expandFileTree(folderName, false);
  };

  // src/main.ts
  var kFileExplorerElementId = "file_explorer";
  var kFileTreeElementId = "file_tree";
  var onReady = async () => {
    console.log("Fetching file listing");
    const fileListing2 = await getFileListing_default();
    _populateFileTree(fileListing2);
    _populateFileExplorer(fileListing2);
    _createEventSubscriptions(fileListing2);
    console.log("Initialization complete");
  };
  var _populateFileTree = (fileListing2) => {
    console.log("Generating file tree");
    const fileTree = fileTree_default(fileListing2);
    const fileTreeElement = document.getElementById(kFileTreeElementId);
    if (fileTreeElement) {
      fileTreeElement.appendChild(fileTree);
    }
  };
  var _populateFileExplorer = (fileListing2) => {
    console.log("Generating file explorer");
    const fileExplorer = fileExplorer_default(fileListing2);
    const fileExplorerElement = document.getElementById(kFileExplorerElementId)?.querySelector(".explorer__listing");
    if (fileExplorerElement) {
      fileExplorerElement.replaceChildren(...fileExplorer);
    }
  };
  var _populateFolderTitle = (folderName) => {
    const titleElement = document.getElementById(kFileExplorerElementId)?.querySelector(".explorer__title");
    titleElement.innerText = folderName;
  };
  var _createEventSubscriptions = (fileListing2) => {
    document.body.addEventListener("item--selected", (event) => {
      if (!event.detail) {
        return;
      }
      const treeNode = findTreeNode(fileListing2, event.detail.identifier);
      if (treeNode) {
        selectItem(event.detail.identifier);
        _populateFolderTitle(treeNode.name);
        _populateFileExplorer(treeNode.children ?? []);
      }
    });
  };

  // src/browser.ts
  document.addEventListener("DOMContentLoaded", function() {
    onReady();
  });
})();
