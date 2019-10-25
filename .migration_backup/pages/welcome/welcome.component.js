"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var grid_layout_1 = require("ui/layouts/grid-layout");
var animation_1 = require("ui/animation");
var platform_1 = require("platform");
var fs = require("file-system");
var builder = require("ui/builder");
var WelcomeComponent = /** @class */ (function () {
    function WelcomeComponent(page, nav) {
        this.page = page;
        this.nav = nav;
        this.slidesPath = 'pages/welcome/slides';
        this.slideFiles = ['slide1.xml', 'slide2.xml', 'slide3.xml'];
        this.currentSlideNum = 0;
        this.slideCount = 3;
        this.screenWidth = platform_1.screen.mainScreen.widthDIPs;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.page.cssClasses.add("welcome-page-background");
        this.page.backgroundSpanUnderStatusBar = true;
        this.slideView = this.slideElement.nativeElement;
        this.loadSlides(this.slideFiles, this.slidesPath).then(function (slides) {
            var row = new grid_layout_1.ItemSpec(1, grid_layout_1.GridUnitType.STAR);
            var gridLayout = new grid_layout_1.GridLayout();
            slides.forEach(function (element, i) {
                grid_layout_1.GridLayout.setColumn(element, 0);
                if (i > 0)
                    element.opacity = 0;
                gridLayout.addChild(element);
            });
            gridLayout.addRow(row);
            _this.slideView.content = (_this.slidesView = gridLayout);
        });
    };
    WelcomeComponent.prototype.loadSlides = function (slideFiles, slidesPath) {
        return new Promise(function (resolve, reject) {
            var slides = [];
            var currentAppFolder = fs.knownFolders.currentApp();
            var path = fs.path.normalize(currentAppFolder.path + "/" + slidesPath);
            slideFiles.forEach(function (dataFile, i) {
                var slidePath = path + "/" + dataFile;
                slides.push(builder.load(slidePath));
            });
            resolve(slides);
        });
    };
    WelcomeComponent.prototype.onSwipe = function (args) {
        var prevSlideNum = this.currentSlideNum;
        var count = this.slideCount;
        if (args.direction == 2) {
            this.currentSlideNum = (this.currentSlideNum + 1) % count;
        }
        else if (args.direction == 1) {
            this.currentSlideNum = (this.currentSlideNum - 1 + count) % count;
        }
        else {
            // We are interested in left and right directions
            return;
        }
        var currSlide = this.slidesView.getChildAt(prevSlideNum);
        var nextSlide = this.slidesView.getChildAt(this.currentSlideNum);
        this.animate(currSlide, nextSlide, args.direction);
    };
    WelcomeComponent.prototype.animate = function (currSlide, nextSlide, direction) {
        nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
        nextSlide.opacity = 1;
        var definitions = new Array();
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
        var animationSet = new animation_1.Animation(definitions);
        animationSet.play().then(function () {
            // console.log("Animation finished");
        })
            .catch(function (e) {
            console.log(e.message);
        });
    };
    WelcomeComponent.prototype.itemSelected = function (item) {
        console.log(item);
    };
    WelcomeComponent.prototype.skipIntro = function () {
        // this.nav.navigate(["/home"], { clearHistory: true });
        this.nav.navigate(["/home"]);
    };
    WelcomeComponent.prototype.getSliderItemClass = function (item) {
        if (item == this.currentSlideNum)
            return "caro-item-dot caro-item-dot-selected";
        return "caro-item-dot";
    };
    __decorate([
        core_1.ViewChild('slideContent'),
        __metadata("design:type", core_1.ElementRef)
    ], WelcomeComponent.prototype, "slideElement", void 0);
    WelcomeComponent = __decorate([
        core_1.Component({
            selector: "welcome",
            moduleId: module.id,
            templateUrl: "./welcome.component.html"
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions])
    ], WelcomeComponent);
    return WelcomeComponent;
}());
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3ZWxjb21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSxzREFBK0Q7QUFFL0QsZ0NBQTRDO0FBRTVDLHNEQUE0RTtBQUM1RSwwQ0FBOEQ7QUFDOUQscUNBQWtDO0FBRWxDLGdDQUFrQztBQUNsQyxvQ0FBc0M7QUFPdEM7SUFjRSwwQkFDVSxJQUFVLEVBQ1YsR0FBcUI7UUFEckIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFFBQUcsR0FBSCxHQUFHLENBQWtCO1FBZnZCLGVBQVUsR0FBRyxzQkFBc0IsQ0FBQztRQUNwQyxlQUFVLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhELG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBQzVCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFhckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDakQsQ0FBQztJQUVELG1DQUFRLEdBQVI7UUFBQSxpQkFvQkM7UUFuQkMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBRTlDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFFakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFXO1lBQ2pFLElBQUksR0FBRyxHQUFHLElBQUksc0JBQVEsQ0FBQyxDQUFDLEVBQUUsMEJBQVksQ0FB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Q3pCLENBQUM7SUExRzBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLGlCQUFVOzBEQUFDO0lBWHpDLGdCQUFnQjtRQUw1QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwwQkFBMEI7U0FDeEMsQ0FBQzt5Q0FnQmdCLFdBQUk7WUFDTCx5QkFBZ0I7T0FoQnBCLGdCQUFnQixDQXNINUI7SUFBRCx1QkFBQztDQUFBLEFBdEhELElBc0hDO0FBdEhZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgUGFnZSwgQ29udGVudFZpZXcgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgU3dpcGVHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInVpL2dlc3R1cmVzL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBHcmlkTGF5b3V0LCBHcmlkVW5pdFR5cGUsIEl0ZW1TcGVjIH0gZnJvbSBcInVpL2xheW91dHMvZ3JpZC1sYXlvdXRcIjtcbmltcG9ydCB7IEFuaW1hdGlvbkRlZmluaXRpb24sIEFuaW1hdGlvbiB9IGZyb20gJ3VpL2FuaW1hdGlvbic7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBidWlsZGVyIGZyb20gXCJ1aS9idWlsZGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJ3ZWxjb21lXCIsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vd2VsY29tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIFdlbGNvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcml2YXRlIHNsaWRlc1BhdGggPSAncGFnZXMvd2VsY29tZS9zbGlkZXMnO1xuICBwcml2YXRlIHNsaWRlRmlsZXMgPSBbJ3NsaWRlMS54bWwnLCAnc2xpZGUyLnhtbCcsICdzbGlkZTMueG1sJ107XG5cbiAgcHJpdmF0ZSBjdXJyZW50U2xpZGVOdW06IG51bWJlciA9IDA7XG4gIHByaXZhdGUgc2xpZGVDb3VudCA9IDM7XG5cbiAgcHJpdmF0ZSBzY3JlZW5XaWR0aDtcblxuICBwcml2YXRlIHNsaWRlc1ZpZXc6IEdyaWRMYXlvdXQ7XG5cbiAgQFZpZXdDaGlsZCgnc2xpZGVDb250ZW50Jykgc2xpZGVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBwcml2YXRlIHNsaWRlVmlldzogQ29udGVudFZpZXc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgbmF2OiBSb3V0ZXJFeHRlbnNpb25zLFxuICApIHtcbiAgICB0aGlzLnNjcmVlbldpZHRoID0gc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5wYWdlLmNzc0NsYXNzZXMuYWRkKFwid2VsY29tZS1wYWdlLWJhY2tncm91bmRcIik7XG4gICAgdGhpcy5wYWdlLmJhY2tncm91bmRTcGFuVW5kZXJTdGF0dXNCYXIgPSB0cnVlO1xuXG4gICAgdGhpcy5zbGlkZVZpZXcgPSB0aGlzLnNsaWRlRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5sb2FkU2xpZGVzKHRoaXMuc2xpZGVGaWxlcywgdGhpcy5zbGlkZXNQYXRoKS50aGVuKChzbGlkZXM6IGFueSkgPT4ge1xuICAgICAgdmFyIHJvdyA9IG5ldyBJdGVtU3BlYygxLCBHcmlkVW5pdFR5cGUuU1RBUik7XG4gICAgICBsZXQgZ3JpZExheW91dCA9IG5ldyBHcmlkTGF5b3V0KCk7XG4gICAgICBzbGlkZXMuZm9yRWFjaCgoZWxlbWVudCwgaSkgPT4ge1xuICAgICAgICBHcmlkTGF5b3V0LnNldENvbHVtbihlbGVtZW50LCAwKTtcbiAgICAgICAgaWYgKGkgPiAwKVxuICAgICAgICAgIGVsZW1lbnQub3BhY2l0eSA9IDBcbiAgICAgICAgZ3JpZExheW91dC5hZGRDaGlsZChlbGVtZW50KTtcbiAgICAgIH0pO1xuICAgICAgZ3JpZExheW91dC5hZGRSb3cocm93KTtcblxuICAgICAgdGhpcy5zbGlkZVZpZXcuY29udGVudCA9ICh0aGlzLnNsaWRlc1ZpZXcgPSBncmlkTGF5b3V0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNsaWRlcyhzbGlkZUZpbGVzLCBzbGlkZXNQYXRoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGNvbnN0IHNsaWRlcyA9IFtdXG4gICAgICBjb25zdCBjdXJyZW50QXBwRm9sZGVyID0gZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKTtcbiAgICAgIGNvbnN0IHBhdGggPSBmcy5wYXRoLm5vcm1hbGl6ZShjdXJyZW50QXBwRm9sZGVyLnBhdGggKyBcIi9cIiArIHNsaWRlc1BhdGgpO1xuICAgICAgc2xpZGVGaWxlcy5mb3JFYWNoKChkYXRhRmlsZSwgaSkgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZVBhdGggPSBwYXRoICsgXCIvXCIgKyBkYXRhRmlsZTtcbiAgICAgICAgc2xpZGVzLnB1c2goYnVpbGRlci5sb2FkKHNsaWRlUGF0aCkpXG4gICAgICB9KTtcblxuICAgICAgcmVzb2x2ZShzbGlkZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgb25Td2lwZShhcmdzOiBTd2lwZUdlc3R1cmVFdmVudERhdGEpIHtcbiAgICBsZXQgcHJldlNsaWRlTnVtID0gdGhpcy5jdXJyZW50U2xpZGVOdW07XG4gICAgbGV0IGNvdW50ID0gdGhpcy5zbGlkZUNvdW50O1xuICAgIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAyKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZU51bSA9ICh0aGlzLmN1cnJlbnRTbGlkZU51bSArIDEpICUgY291bnQ7XG4gICAgfSBlbHNlIGlmIChhcmdzLmRpcmVjdGlvbiA9PSAxKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZU51bSA9ICh0aGlzLmN1cnJlbnRTbGlkZU51bSAtIDEgKyBjb3VudCkgJSBjb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgYXJlIGludGVyZXN0ZWQgaW4gbGVmdCBhbmQgcmlnaHQgZGlyZWN0aW9uc1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJTbGlkZSA9IHRoaXMuc2xpZGVzVmlldy5nZXRDaGlsZEF0KHByZXZTbGlkZU51bSk7XG4gICAgY29uc3QgbmV4dFNsaWRlID0gdGhpcy5zbGlkZXNWaWV3LmdldENoaWxkQXQodGhpcy5jdXJyZW50U2xpZGVOdW0pO1xuXG4gICAgdGhpcy5hbmltYXRlKGN1cnJTbGlkZSwgbmV4dFNsaWRlLCBhcmdzLmRpcmVjdGlvbik7XG4gIH1cblxuICBhbmltYXRlKGN1cnJTbGlkZSwgbmV4dFNsaWRlLCBkaXJlY3Rpb24pIHtcbiAgICBuZXh0U2xpZGUudHJhbnNsYXRlWCA9IChkaXJlY3Rpb24gPT0gMiA/IHRoaXMuc2NyZWVuV2lkdGggOiAtdGhpcy5zY3JlZW5XaWR0aCk7XG4gICAgbmV4dFNsaWRlLm9wYWNpdHkgPSAxO1xuICAgIHZhciBkZWZpbml0aW9ucyA9IG5ldyBBcnJheTxBbmltYXRpb25EZWZpbml0aW9uPigpO1xuICAgIFxuICAgIGRlZmluaXRpb25zLnB1c2goe1xuICAgICAgdGFyZ2V0OiBjdXJyU2xpZGUsXG4gICAgICB0cmFuc2xhdGU6IHsgeDogKGRpcmVjdGlvbiA9PSAyID8gLXRoaXMuc2NyZWVuV2lkdGggOiB0aGlzLnNjcmVlbldpZHRoKSwgeTogMCB9LFxuICAgICAgZHVyYXRpb246IDUwMFxuICAgIH0pO1xuXG4gICAgZGVmaW5pdGlvbnMucHVzaCh7XG4gICAgICB0YXJnZXQ6IG5leHRTbGlkZSxcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBkdXJhdGlvbjogNTAwXG4gICAgfSk7XG5cbiAgICB2YXIgYW5pbWF0aW9uU2V0ID0gbmV3IEFuaW1hdGlvbihkZWZpbml0aW9ucyk7XG5cbiAgICBhbmltYXRpb25TZXQucGxheSgpLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJBbmltYXRpb24gZmluaXNoZWRcIik7XG4gICAgfSlcbiAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cblxuICBpdGVtU2VsZWN0ZWQoaXRlbTogbnVtYmVyKSB7XG5cbiAgICBjb25zb2xlLmxvZyhpdGVtKVxuICB9XG5cbiAgc2tpcEludHJvKCkge1xuICAgIC8vIHRoaXMubmF2Lm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICB0aGlzLm5hdi5uYXZpZ2F0ZShbXCIvaG9tZVwiXSk7XG4gIH1cblxuICBnZXRTbGlkZXJJdGVtQ2xhc3MoaXRlbTogbnVtYmVyKSB7XG4gICAgaWYgKGl0ZW0gPT0gdGhpcy5jdXJyZW50U2xpZGVOdW0pXG4gICAgICByZXR1cm4gXCJjYXJvLWl0ZW0tZG90IGNhcm8taXRlbS1kb3Qtc2VsZWN0ZWRcIjtcblxuICAgIHJldHVybiBcImNhcm8taXRlbS1kb3RcIjtcbiAgfVxufVxuIl19