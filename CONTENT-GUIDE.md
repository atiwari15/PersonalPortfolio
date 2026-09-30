# Editing your portfolio

Open [Sanity Studio](http://localhost:3333/studio/structure) while the local preview is running. Sign in with the account you used to create the Sanity project.

## Add MSHN and Stym screenshots

1. Select **Projects**, then **MSHN** or **Stym**.
2. Find **Thumbnail** and choose **Upload**. Select your screenshot.
3. Enter **Alternative text** describing what is visible, such as “MSHN dashboard displaying a market event and supporting SEC filing excerpts.” Adjust this example to match your actual screenshot.
4. Use the image crop/hotspot controls if needed. Landscape screenshots work best; the website crops images to an 8:5 frame. Keep important details near the center or move the hotspot to them.
5. Click **Publish**. Repeat for the other project.

The thumbnail appears on the homepage card and at the top of the project page. For additional screenshots, insert images into **Case study**, with alternative text. Those images also use the current 8:5 crop. **Gallery images** is stored for future use and does not yet appear on the website.

## Add a project

1. Open **Projects** and use the create-document button.
2. Fill in **Title**, generate the **Slug**, and write a **Short description**. The slug becomes the project page address, for example `/projects/my-project`; changing it later changes that address.
3. Add a **Case study**, **Category**, **Technologies**, optional links, and a thumbnail. Technology fields reference entries in **Skills**; add a new skill there if it is missing.
4. Turn on **Featured** to show the project on the homepage. Set **Display order** to choose its position: lower numbers appear first. MSHN, Stym and Unidad currently use 0, 1 and 2.
5. Click **Publish**. Saving a draft alone does not make it visible on the portfolio.

## Assign the blank neural node

The three active nodes follow the first three published, featured projects in display order. Their labels and destinations come from those projects' titles and slugs.

To activate the fourth node, first publish another project with a slug. Then open **Site settings → Fourth neural node**, select that project, and **Publish** site settings. Choose a project other than the first three featured projects. The fourth project does not have to be featured. Clear the reference and publish again to return it to an empty, inactive node. An unpublished or duplicate selection stays inactive.

## Edit other content

- **Site settings:** headline, introduction, social links and résumé PDF.
- **Experience:** company, role, dates, summary and bullet points.
- **Education:** school, degree and graduation date.
- **Skills:** name and category; categories group the homepage skills.

Publish each edited document when it is ready. Certifications are currently stored in Sanity but are not displayed on the website.

## See your changes

Open [the portfolio](http://localhost:3333/). Published changes can take about a minute to refresh. Reload after that; the first request may trigger the refresh, so reload once more if you still see the old content. You do not need to rebuild or redeploy for content changes.

The local website and Studio need the local server to be running. This preview has not been deployed publicly.
