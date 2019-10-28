import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page, ContentView } from "tns-core-modules/ui/page";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { GridLayout, GridUnitType, ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { AnimationDefinition, Animation } from 'tns-core-modules/ui/animation';
import { screen } from "tns-core-modules/platform";

import * as fs from "tns-core-modules/file-system";
import * as builder from "tns-core-modules/ui/builder";

@Component({
  selector: "welcome",
  moduleId: module.id,
  templateUrl: "./welcome.component.html"
})
export class WelcomeComponent implements OnInit {
  private slidesPath = 'pages/welcome/slides';
  private slideFiles = ['slide1-fragment.xml', 'slide2-fragment.xml', 'slide3-fragment.xml'];

  private currentSlideNum: number = 0;
  private slideCount = 3;

  private screenWidth;

  private slidesView: GridLayout;

  @ViewChild('slideContent', { static: true }) slideElement: ElementRef;
  private slideView: ContentView;

  constructor(
    private page: Page,
    private nav: RouterExtensions,
  ) {
    this.screenWidth = screen.mainScreen.widthDIPs;
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.cssClasses.add("welcome-page-background");
    this.page.backgroundSpanUnderStatusBar = true;

    console.log(`slideElement is null: ${this.slideElement == null}`);

    this.slideView = this.slideElement.nativeElement;

    console.log(`slideFiles is null: ${this.slideFiles == null}`);
    console.log(`slideFiles length: ${this.slideFiles.length}`);

    this.loadSlides(this.slideFiles, this.slidesPath).then((slides: any) => {
      var row = new ItemSpec(1, GridUnitType.STAR);
      let gridLayout = new GridLayout();
      slides.forEach((element, i) => {
        GridLayout.setColumn(element, 0);
        if (i > 0)
          element.opacity = 0
        gridLayout.addChild(element);
      });
      gridLayout.addRow(row);

      this.slideView.content = (this.slidesView = gridLayout);
    });
  }

  private loadSlides(slideFiles, slidesPath) {
    return new Promise(function (resolve, reject) {
      const slides = []
      const currentAppFolder = fs.knownFolders.currentApp();
      slideFiles.forEach((dataFile, i) => {
        const path = `~/${slidesPath}/${dataFile}`;

        var slide = builder.load(path);

        console.log(`slide is null: ${slide == null}`);

        slides.push(slide)
      });

      resolve(slides);
    });
  }

  onSwipe(args: SwipeGestureEventData) {
    let prevSlideNum = this.currentSlideNum;
    let count = this.slideCount;
    if (args.direction == 2) {
      this.currentSlideNum = (this.currentSlideNum + 1) % count;
    } else if (args.direction == 1) {
      this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
    } else {
      // We are interested in left and right directions
      return;
    }

    const currSlide = this.slidesView.getChildAt(prevSlideNum);
    const nextSlide = this.slidesView.getChildAt(this.currentSlideNum);

    this.animate(currSlide, nextSlide, args.direction);
  }

  animate(currSlide, nextSlide, direction) {
    nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
    nextSlide.opacity = 1;
    var definitions = new Array<AnimationDefinition>();
    
    definitions.push({
      target: currSlide,
      translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
      duration: 500
    });

    definitions.push({
      target: nextSlide,
      translate: { x: 0, y: 0 },
      duration: 500
    });

    var animationSet = new Animation(definitions);

    animationSet.play().then(() => {
      // console.log("Animation finished");
    })
      .catch((e) => {
        console.log(e.message);
      });
  }

  itemSelected(item: number) {

    console.log(item)
  }

  skipIntro() {
    // this.nav.navigate(["/home"], { clearHistory: true });
    this.nav.navigate(["/home"]);
  }

  getSliderItemClass(item: number) {
    if (item == this.currentSlideNum)
      return "caro-item-dot caro-item-dot-selected";

    return "caro-item-dot";
  }
}
