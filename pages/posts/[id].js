import { Fragment, useState, useEffect } from "react"; 

import Link from "next/link";
import Head from "next/head";

import Markdown from "../../components/markdown/Markdown.js"

import { getPostsId, getPostData } from "../../lib/posts";

import styles from "../../styles/id.module.css";

import Layout from "../../components/Layout";
import Container from "../../components/Container";

export default function Post({ postData }) {
	const [ postId, setPostId ] = useState(null);

	useEffect(() => {
		setPostId(window.location.pathname.split('/')[2]);
	}, [])

	return (
		<Fragment>
			<Head>
				<title key="title">{postData.title}</title>
				<meta key="description" name="description" content={postData.preview} />
				{postId &&
				<Fragment>
					<meta key="og:url" property="og:url" content={`aurelienbrabant.fr/posts/${postId}`} />
					<link key="canonical" rel="canonical" href={`https://aurelienbrabant.fr/posts/${postId}`} />
				</Fragment>
				}
			</Head>
			<Layout>
				<Container
					pageHeight
					size="md"
					enableXxl={true}
				>
					<div className={styles.wrapper}>
						<div
							className={styles.postHeader}
						>
							<h2>{postData.title}</h2>
							<h4>
								The {" "} 
								{new Date(postData.date).toLocaleDateString("fr-Fr")} { " "}
								- By {postData.author} 
							</h4>
							<Link href="/">
								<a>Go back to menu</a>
							</Link>
						</div>
						<div className={styles.postBody}>
							<Markdown
								markdownData={postData.content}
							/>
						</div>
						<div className={styles.endLinks}>
							<div>
								{postData.previous && (
									<Fragment>
										<span
											className={styles.arrows}
										>
											{"<<"}
										</span>
										<Link 
											href={`/posts/${postData.previous}`}
										>
											{postData.previous}
										</Link>

									</Fragment>
								)
								}
							</div>
							<div style={{textAlign: "right"}}>
								{postData.next && (
									<Fragment>
										<Link 
											href={`/posts/${postData.next}`}
										>
											{postData.next}
										</Link>
										<span
											className={styles.arrows}
										>
											{">>"}
										</span>
									</Fragment>
								)
								}
							</div>
						</div>
					</div>
				</Container>
			</Layout>
		</Fragment>
	);
}

export async function getStaticPaths() {
	const paths = getPostsId();
	return {
		paths,
		fallback: false,
	}
}

export async function getStaticProps({ params }) {
	const postData = getPostData(params.id);
	return {
		props: {
			postData
		}
	};
}
